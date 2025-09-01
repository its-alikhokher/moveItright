# apps/moveitright/moveitright/api/custom_api.py

import frappe
from frappe.model.document import Document
from frappe.utils import now, now_datetime, cstr
from frappe.model.workflow import apply_workflow

@frappe.whitelist()
def get_asset_movements_with_items():
    """Get Asset Movements with their items for current user"""
    try:
        # Check permissions for Asset Movement
        if not frappe.has_permission("Asset Movement", "read"):
            frappe.throw("Insufficient permissions for Asset Movement", frappe.PermissionError)
        
        # Get current user roles
        user_roles = frappe.get_roles(frappe.session.user)
        
        # Build filters based on user role
        filters = {}
        if "Asset Custodian" in user_roles:
            filters["owner"] = frappe.session.user
        # Admins, HODs, Transport Admins, Asset Managers can see all
        
        # Fetch parent Asset Movement data with workflow states
        fields = [
            "name", "asset", "from_location", "to_location", "expected_date", 
            "status", "remarks", "owner", "creation", "modified", "docstatus",
            "modified_by", "transaction_date", "workflow_state", "purpose"
        ]
        
        movements = frappe.get_list(
            "Asset Movement",
            fields=fields,
            filters=filters,
            limit_page_length=50,
            order_by="modified desc"
        )

        # Fetch child Asset Movement Item data for each movement
        for movement in movements:
            if not frappe.has_permission("Asset Movement Item", "read"):
                movement["items"] = []
                movement["error"] = "Insufficient permissions for Asset Movement Item"
            else:
                movement["items"] = frappe.get_list(
                    "Asset Movement Item",
                    fields=["source_location", "target_location", "asset", "asset_name"],
                    filters={"parent": movement.name, "parenttype": "Asset Movement"}
                )
                
            # Get asset details if available
            if movement.get("asset"):
                try:
                    asset_doc = frappe.get_doc("Asset", movement["asset"])
                    movement["asset_name"] = asset_doc.asset_name
                    movement["asset_category"] = asset_doc.asset_category
                    movement["item_code"] = asset_doc.item_code
                except:
                    pass
                    
            # Get available workflow actions for current user
            movement["available_actions"] = get_workflow_actions_for_user(movement.name, movement.get("workflow_state"))
            
        return {"status": "success", "data": movements}
        
    except Exception as e:
        frappe.log_error(f"Error fetching Asset Movements: {str(e)}")
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_workflow_actions_for_user(movement_name, current_state):
    """Get available workflow actions for current user and document state"""
    try:
        user_roles = frappe.get_roles(frappe.session.user)
        
        # Get workflow transitions for current state
        workflow_transitions = frappe.get_list(
            "Workflow Transition",
            fields=["action", "next_state", "allowed"],
            filters={
                "parent": "Asset Movement Workflow",
                "state": current_state or "Draft"
            }
        )
        
        available_actions = []
        for transition in workflow_transitions:
            if transition.allowed in user_roles:
                available_actions.append({
                    "action": transition.action,
                    "next_state": transition.next_state,
                    "allowed_role": transition.allowed
                })
                
        return available_actions
        
    except Exception as e:
        frappe.log_error(f"Error getting workflow actions: {str(e)}")
        return []

@frappe.whitelist()
def create_asset_movement(asset, from_location, to_location, expected_date, remarks=""):
    """Create new Asset Movement with workflow"""
    try:
        # Check permissions
        if not frappe.has_permission("Asset Movement", "create"):
            frappe.throw("Insufficient permissions to create Asset Movement", frappe.PermissionError)
        
        # Validate asset exists
        if not frappe.db.exists("Asset", asset):
            frappe.throw(f"Asset {asset} does not exist")
            
        # Create new Asset Movement document
        movement_doc = frappe.new_doc("Asset Movement")
        movement_doc.purpose = "Transfer"
        movement_doc.asset = asset
        movement_doc.from_location = from_location
        movement_doc.to_location = to_location
        movement_doc.expected_date = expected_date
        movement_doc.remarks = remarks
        movement_doc.transaction_date = now()
        
        # Set initial workflow state
        movement_doc.workflow_state = "Draft"
        
        # Save the document
        movement_doc.insert(ignore_permissions=True)
        
        return {
            "status": "success", 
            "data": movement_doc.as_dict(),
            "message": f"Asset Movement {movement_doc.name} created successfully"
        }
        
    except Exception as e:
        frappe.log_error(f"Error creating Asset Movement: {str(e)}")
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def apply_workflow_action(movement_name, action):
    """Apply workflow action to Asset Movement"""
    try:
        # Get the document
        movement_doc = frappe.get_doc("Asset Movement", movement_name)
        
        # Check if user has permission for this action
        user_roles = frappe.get_roles(frappe.session.user)
        current_state = movement_doc.workflow_state or "Draft"
        
        # Get the specific transition for this action and state
        transition = frappe.get_value(
            "Workflow Transition",
            {
                "parent": "Asset Movement Workflow",
                "state": current_state,
                "action": action
            },
            ["next_state", "allowed"]
        )
        
        if not transition:
            frappe.throw(f"Invalid action '{action}' for current state '{current_state}'")
            
        next_state, allowed_role = transition
        
        if allowed_role not in user_roles:
            frappe.throw(f"You don't have permission to perform action '{action}'. Required role: {allowed_role}")
        
        # Apply the workflow action
        movement_doc.workflow_state = next_state
        movement_doc.add_comment("Workflow", f"Workflow state changed to {next_state} by {frappe.session.user}")
        movement_doc.save(ignore_permissions=True)
        
        # Submit document if it reaches certain states
        if next_state in ["HOD Approval Pending", "Request Approved"] and movement_doc.docstatus == 0:
            movement_doc.submit()
        
        return {
            "status": "success",
            "data": movement_doc.as_dict(),
            "message": f"Action '{action}' applied successfully. New state: {next_state}"
        }
        
    except Exception as e:
        frappe.log_error(f"Error applying workflow action: {str(e)}")
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_user_dashboard_data():
    """Get dashboard data based on user role"""
    try:
        user_roles = frappe.get_roles(frappe.session.user)
        
        # Base filters for Asset Movement
        filters = {}
        if "Asset Custodian" in user_roles and not any(role in ["Administrator", "System Manager"] for role in user_roles):
            filters["owner"] = frappe.session.user
        
        # Get counts by workflow state
        states_data = {}
        all_states = [
            "Draft", "Awaiting Transport Allocation", "External Transport Required",
            "HOD Approval Pending", "HOD Approved", "Request Approved", 
            "Collected", "Delivered", "Closed", "HOD Rejected", "Asset Manager Rejected"
        ]
        
        for state in all_states:
            state_filters = filters.copy()
            state_filters["workflow_state"] = state
            count = frappe.db.count("Asset Movement", state_filters)
            states_data[state] = count
        
        # Get recent movements
        recent_movements = frappe.get_list(
            "Asset Movement",
            fields=["name", "asset", "from_location", "to_location", "workflow_state", "creation"],
            filters=filters,
            limit_page_length=10,
            order_by="creation desc"
        )
        
        # Role-specific metrics
        dashboard_data = {
            "total_requests": sum(states_data.values()),
            "states_breakdown": states_data,
            "recent_movements": recent_movements,
            "user_roles": user_roles
        }
        
        # Add role-specific data
        if "Transport Administrator" in user_roles:
            dashboard_data["pending_transport_allocation"] = states_data.get("Awaiting Transport Allocation", 0)
            dashboard_data["in_transit"] = states_data.get("Collected", 0)
            
        if "HOD (Finance)" in user_roles:
            dashboard_data["pending_hod_approval"] = states_data.get("HOD Approval Pending", 0)
            
        if "Asset Manager (IT/Furniture)" in user_roles:
            dashboard_data["pending_manager_approval"] = states_data.get("HOD Approved", 0)
            
        if "Asset Custodian" in user_roles:
            dashboard_data["my_requests"] = frappe.db.count("Asset Movement", {"owner": frappe.session.user})
            dashboard_data["pending_collection"] = states_data.get("Request Approved", 0)
            dashboard_data["pending_closure"] = states_data.get("Delivered", 0)
        
        return {"status": "success", "data": dashboard_data}
        
    except Exception as e:
        frappe.log_error(f"Error getting dashboard data: {str(e)}")
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_locations():
    """Get all active locations"""
    try:
        locations = frappe.get_list(
            "Location",
            fields=["name", "location_name", "is_group"],
            filters={"disabled": 0},
            order_by="location_name"
        )
        return {"status": "success", "data": locations}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_assets_by_location(location, category=None):
    """Get assets by location and optionally by category"""
    try:
        filters = {
            "location": location,
            "docstatus": 1  # Only submitted assets
        }
        
        if category:
            filters["asset_category"] = category
            
        assets = frappe.get_list(
            "Asset",
            fields=["name", "asset_name", "asset_category", "location", "status", "item_code"],
            filters=filters,
            order_by="asset_name"
        )
        
        return {"status": "success", "data": assets}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_asset_categories():
    """Get all active asset categories"""
    try:
        categories = frappe.get_list(
            "Asset Category",
            fields=["name", "asset_category_name"],
            filters={"disabled": 0},
            order_by="asset_category_name"
        )
        return {"status": "success", "data": categories}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def search_assets(search_term, location=None, category=None):
    """Search assets by name or item code"""
    try:
        filters = {"docstatus": 1}
        
        if location:
            filters["location"] = location
        if category:
            filters["asset_category"] = category
            
        # Use or_filters for search
        or_filters = [
            {"asset_name": ["like", f"%{search_term}%"]},
            {"item_code": ["like", f"%{search_term}%"]},
            {"name": ["like", f"%{search_term}%"]}
        ]
        
        assets = frappe.get_list(
            "Asset",
            fields=["name", "asset_name", "asset_category", "location", "status", "item_code"],
            filters=filters,
            or_filters=or_filters,
            limit_page_length=10,
            order_by="asset_name"
        )
        
        return {"status": "success", "data": assets}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def save_rejection_reason(docname, reason):
    """Save rejection reason for Asset Movement"""
    try:
        # Check if rejection reason doctype exists, if not use comments
        if frappe.db.exists("DocType", "Rejection Reason"):
            rejection = frappe.new_doc("Rejection Reason")
            rejection.reference_document = docname
            rejection.rejected_by = frappe.session.user
            rejection.data = frappe.db.get_value("Asset Movement", docname, "workflow_state")
            rejection.reason = reason
            rejection.datetime = now_datetime()
            rejection.insert(ignore_permissions=True)
        else:
            # Fallback to comment
            movement_doc = frappe.get_doc("Asset Movement", docname)
            movement_doc.add_comment("Info", f"Rejection Reason: {reason}")
            
        return {"status": "success", "message": "Rejection reason saved"}
    except Exception as e:
        frappe.log_error(f"Error saving rejection reason: {str(e)}")
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_current_user_info():
    """Get current user information and roles"""
    try:
        user = frappe.session.user
        user_doc = frappe.get_doc("User", user)
        user_roles = frappe.get_roles(user)
        
        return {
            "status": "success",
            "data": {
                "user": user,
                "full_name": user_doc.full_name,
                "email": user_doc.email,
                "roles": user_roles,
                "is_administrator": "Administrator" in user_roles or "System Manager" in user_roles
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def get_transporters():
    """Get all active transporters/suppliers"""
    try:
        transporters = frappe.get_list(
            "Supplier",
            fields=["name", "supplier_name", "mobile_no", "email_id"],
            filters={"disabled": 0},
            order_by="supplier_name"
        )
        return {"status": "success", "data": transporters}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@frappe.whitelist()
def assign_transport_details(movement_name, transport_data):
    """Assign transport details to Asset Movement"""
    try:
        movement_doc = frappe.get_doc("Asset Movement", movement_name)
        
        # Add transport details as custom fields or in remarks
        transport_info = f"Transport Details: {transport_data.get('vehicle_type', '')}"
        if transport_data.get('transporter'):
            transport_info += f", Transporter: {transport_data['transporter']}"
        if transport_data.get('driver'):
            transport_info += f", Driver: {transport_data['driver']}"
            
        current_remarks = movement_doc.remarks or ""
        movement_doc.remarks = f"{current_remarks}\n{transport_info}".strip()
        movement_doc.save(ignore_permissions=True)
        
        return {
            "status": "success",
            "data": movement_doc.as_dict(),
            "message": "Transport details assigned successfully"
        }
    except Exception as e:
        frappe.log_error(f"Error assigning transport details: {str(e)}")
        return {"status": "error", "message": str(e)}
