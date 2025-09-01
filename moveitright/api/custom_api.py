# apps/nextash/nextash/custom_api.py

import frappe
from frappe.model.document import Document
from frappe.utils import now
from frappe.utils import now_datetime

@frappe.whitelist()
def get_asset_movements_with_items():
    try:
        # Check permissions for Asset Movement
        if not frappe.has_permission("Asset Movement", "read"):
            frappe.throw("Insufficient permissions for Asset Movement", frappe.PermissionError)
        
        # Fetch parent Asset Movement data
        fields = ["purpose", "transaction_date", "company"]
        movements = frappe.get_list(
            "Asset Movement",
            fields=fields,
            limit_page_length=50,
            order_by="modified desc"
        )

        # Fetch child Asset Movement Item data
        for movement in movements:
            if not frappe.has_permission("Asset Movement Item", "read"):
                movement["items"] = []
                movement["error"] = "Insufficient permissions for Asset Movement Item"
            else:
                movement["items"] = frappe.get_list(
                    "Asset Movement Item",
                    fields=["source_location", "target_location", "asset"],
                    filters={"parent": movement.name, "parenttype": "Asset Movement"}
                )
        return movements
    except Exception as e:
        frappe.log_error(f"Error fetching Asset Movements: {str(e)}")
        frappe.throw(f"Failed to fetch Asset Movements: {str(e)}")





@frappe.whitelist()
def save_rejection_reason(docname, reason):
    rejection = frappe.new_doc(" Rejection Reason")
    rejection.reference_document = docname
    rejection.rejected_by = frappe.session.user
    rejection.data = frappe.db.get_value("Asset Movement", docname, "workflow_state")
    rejection.reason = reason
    rejection.datetime = now_datetime()
    rejection.insert(ignore_permissions=True)
    return {"status": "ok"}
