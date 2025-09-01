// Asset Service for Frappe integration
// This service provides methods to interact with Frappe ERPNext for asset management

// Frappe API helper function
const frappeAPI = async (method, endpoint, data = null) => {
  const config = {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`/api/method/${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return { data: result.message, error: null };
  } catch (error) {
    console.error(`Frappe API error (${endpoint}):`, error);
    return { data: null, error: error.message };
  }
};

// Location services using Frappe
export const locationService = {
  // Get all locations from Frappe
  async getAllLocations() {
    return await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Location',
      fields: ['name', 'location_name', 'is_group'],
      filters: { disabled: 0 }
    });
  },

  // Get location by name
  async getLocationByName(name) {
    return await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Location',
      name: name
    });
  }
};

// Asset Category services using Frappe
export const categoryService = {
  // Get all asset categories from Frappe
  async getAllCategories() {
    return await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset Category',
      fields: ['name', 'asset_category_name', 'enable_cwip_accounting'],
      filters: { disabled: 0 }
    });
  },

  // Get category by name
  async getCategoryByName(name) {
    return await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Asset Category',
      name: name
    });
  }
};

// Asset services using Frappe ERPNext
export const assetService = {
  // Get assets by location and optionally by category
  async getAssetsByLocation(location, category = null) {
    const filters = { 
      location: location,
      docstatus: 1 // Only submitted assets
    };

    if (category) {
      filters.asset_category = category;
    }

    return await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: filters
    });
  },

  // Get asset by name/ID
  async getAssetByName(name) {
    return await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Asset',
      name: name
    });
  },

  // Search assets by name or item code
  async searchAssets(searchTerm, location = null, category = null) {
    const filters = {
      docstatus: 1
    };

    if (location) {
      filters.location = location;
    }

    if (category) {
      filters.asset_category = category;
    }

    return await frappeAPI('POST', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: filters,
      or_filters: [
        { asset_name: ['like', `%${searchTerm}%`] },
        { item_code: ['like', `%${searchTerm}%`] },
        { name: ['like', `%${searchTerm}%`] }
      ],
      limit: 10
    });
  }
};

// Helper function to map Frappe Asset Movement status to frontend workflow status
const mapFrappeStatusToFrontend = (frappeStatus, workflowState) => {
  const statusMap = {
    'Draft': 'Pending HOD Approval',
    'Submitted': 'Pending Manager Approval', 
    'Approved': 'Pending Admin Transport',
    'In Transit': 'In Progress',
    'Completed': 'Completed',
    'Cancelled': 'Denied'
  };

  // If workflow state exists, use it for more specific mapping
  if (workflowState) {
    const workflowMap = {
      'Pending HOD Approval': 'Pending HOD Approval',
      'Pending Manager Approval': 'Pending Manager Approval',
      'Pending Admin Transport': 'Pending Admin Transport',
      'Transport Assigned': 'In Progress',
      'In Transit': 'In Progress',
      'Completed': 'Completed',
      'Rejected': 'Denied'
    };
    return workflowMap[workflowState] || statusMap[frappeStatus] || 'Draft';
  }

  return statusMap[frappeStatus] || 'Draft';
};

// Helper function to transform Frappe Asset Movement to frontend format
const transformAssetMovementToFrontend = (movement, index = 0) => {
  const frontendRequest = {
    id: index + 1,
    requestId: movement.name,
    assetId: movement.asset || 'UNKNOWN',
    assetName: movement.asset_name || movement.asset || 'Unknown Asset',
    assetCode: movement.item_code || movement.asset || 'UNK-000',
    assetCategory: movement.asset_category || 'Unknown',
    fromLocation: movement.from_location || 'Unknown Location',
    toLocation: movement.to_location || 'Unknown Location',
    transportType: 'Internal', // Static value - can be enhanced later
    transport_vehicle_type: 1, // Static value
    requestedDate: movement.expected_date || movement.transaction_date,
    status: mapFrappeStatusToFrontend(movement.status, movement.workflow_state),
    requestedBy: movement.owner || 'System User',
    requestedByUserId: 1, // Static value 
    requestDate: movement.creation,
    comments: movement.remarks || '',
    assignedHOD: 'HOD User', // Static value - can be enhanced with workflow assignment
    assignedHODId: 1, // Static value
    assignedManager: 'Manager User', // Static value
    assignedManagerId: 1, // Static value
    
    // Transport details with static values for missing fields
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 1,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: movement.status === 'In Transit' || movement.status === 'Completed'
    },
    
    // Approval status mapped from Frappe workflow
    approvalStatus: {
      isApproved: movement.docstatus === 1,
      approvedBy: movement.modified_by || null,
      approvedDate: movement.modified || null,
      comments: movement.remarks || null
    },
    
    // Dispatch status
    dispatchStatus: {
      isDispatched: movement.status === 'In Transit' || movement.status === 'Completed',
      dispatchedBy: movement.status === 'In Transit' ? 'Transport Administrator' : null,
      dispatchDate: movement.status === 'In Transit' ? movement.modified : null,
      currentCustodianNotified: movement.status !== 'Draft',
      newCustodianNotified: movement.status !== 'Draft',
      estimatedArrival: movement.expected_date || null,
      completedDate: movement.status === 'Completed' ? movement.modified : null
    }
  };

  return frontendRequest;
};

// Relocation Request services using Frappe Asset Movement Workflow
export const relocationService = {
  // Create new relocation request using Asset Movement
  async createRequest(requestData) {
    const result = await frappeAPI('POST', 'frappe.client.insert', {
      doc: {
        doctype: 'Asset Movement',
        purpose: 'Transfer',
        asset: requestData.asset,
        from_location: requestData.fromLocation,
        to_location: requestData.toLocation,
        expected_date: requestData.requestedDate,
        remarks: requestData.comments || '',
        transaction_date: new Date().toISOString().split('T')[0]
      }
    });

    if (result.data) {
      // Transform the created movement to frontend format
      return {
        data: transformAssetMovementToFrontend(result.data),
        error: null
      };
    }

    return result;
  },

  // Get all requests for current user
  async getUserRequests(user) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset Movement',
      fields: [
        'name', 'asset', 'from_location', 'to_location', 'expected_date', 
        'status', 'remarks', 'owner', 'creation', 'modified', 'docstatus',
        'modified_by', 'transaction_date', 'workflow_state'
      ],
      filters: { owner: user },
      order_by: 'creation desc'
    });

    if (result.data) {
      // Transform Frappe Asset Movements to frontend relocation requests format
      const transformedRequests = result.data.map((movement, index) => 
        transformAssetMovementToFrontend(movement, index)
      );
      
      return { data: transformedRequests, error: null };
    }

    return result;
  },

  // Get all requests (for admins/managers)
  async getAllRequests() {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset Movement',
      fields: [
        'name', 'asset', 'from_location', 'to_location', 'expected_date', 
        'status', 'remarks', 'owner', 'creation', 'modified', 'docstatus',
        'modified_by', 'transaction_date', 'workflow_state'
      ],
      order_by: 'creation desc'
    });

    if (result.data) {
      // Transform Frappe Asset Movements to frontend relocation requests format
      const transformedRequests = result.data.map((movement, index) => 
        transformAssetMovementToFrontend(movement, index)
      );
      
      return { data: transformedRequests, error: null };
    }

    return result;
  },

  // Update request status using Frappe workflow
  async updateRequestStatus(requestName, status, updateData = {}) {
    // Map frontend status to Frappe workflow action
    const statusActionMap = {
      'Pending Manager Approval': 'approve_hod',
      'Pending Admin Transport': 'approve_manager', 
      'In Progress': 'assign_transport',
      'Completed': 'complete_movement',
      'Denied': 'reject'
    };

    const action = statusActionMap[status];
    
    if (action) {
      // Use workflow action if available
      return await frappeAPI('POST', `frappe.client.set_workflow_state`, {
        doctype: 'Asset Movement',
        name: requestName,
        workflow_state: status,
        ...updateData
      });
    } else {
      // Fallback to direct status update
      return await frappeAPI('PUT', 'frappe.client.set_value', {
        doctype: 'Asset Movement',
        name: requestName,
        fieldname: 'status',
        value: status,
        ...updateData
      });
    }
  },

  // Submit/approve request
  async approveRequest(requestName) {
    return await frappeAPI('POST', 'frappe.client.submit_doc', {
      doctype: 'Asset Movement',
      name: requestName
    });
  },

  // Reject request
  async rejectRequest(requestName, reason = '') {
    return await frappeAPI('POST', 'frappe.client.cancel_doc', {
      doctype: 'Asset Movement',
      name: requestName
    });
  },

  // Get request details by ID
  async getRequestById(requestName) {
    const result = await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Asset Movement',
      name: requestName
    });

    if (result.data) {
      return {
        data: transformAssetMovementToFrontend(result.data),
        error: null
      };
    }

    return result;
  }
};

// User and role services
export const userService = {
  // Get current user details
  async getCurrentUser() {
    return await frappeAPI('GET', 'frappe.auth.get_logged_user');
  },

  // Get user permissions
  async getUserPermissions(user) {
    return await frappeAPI('GET', 'frappe.core.doctype.user_permission.user_permission.get_user_permissions', {
      user: user
    });
  }
};

// Transporter services using Frappe
export const transporterService = {
  // Get all transporters/suppliers
  async getAllTransporters() {
    return await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Supplier',
      fields: ['name', 'supplier_name', 'mobile_no', 'email_id'],
      filters: { disabled: 0 }
    });
  },

  // Get transporter by name
  async getTransporterById(name) {
    return await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Supplier',
      name: name
    });
  }
};

// Custom API for MoveItRight specific functions
export const moveItRightService = {
  // This would call custom API methods specific to MoveItRight functionality
  // These methods would be implemented in moveitright/api/custom_api.py

  // Get asset relocation requests with full details (uses relocationService)
  async getRelocationRequests(filters = {}) {
    return await relocationService.getAllRequests();
  },

  // Create asset relocation request with business logic (uses relocationService)
  async createRelocationRequest(requestData) {
    return await relocationService.createRequest(requestData);
  },

  // Approve/reject relocation request
  async processRelocationRequest(requestId, action, comments = '') {
    if (action === 'approve') {
      return await relocationService.approveRequest(requestId);
    } else if (action === 'reject') {
      return await relocationService.rejectRequest(requestId, comments);
    }
    
    return { data: null, error: 'Invalid action' };
  },

  // Get dashboard data for different user roles
  async getDashboardData(role) {
    // This would aggregate data from various sources
    // For now, return asset movements as the main data
    const requests = await relocationService.getAllRequests();
    
    return {
      data: {
        totalRequests: requests.data ? requests.data.length : 0,
        pendingRequests: requests.data ? requests.data.filter(r => r.status.includes('Pending')).length : 0,
        completedRequests: requests.data ? requests.data.filter(r => r.status === 'Completed').length : 0,
        inProgressRequests: requests.data ? requests.data.filter(r => r.status === 'In Progress').length : 0,
        requests: requests.data || []
      },
      error: requests.error
    };
  },

  // Get transport options
  async getTransportOptions() {
    // Return static transport options - can be enhanced with Frappe data
    return {
      data: {
        vehicleTypes: [
          { id: 1, name: '1-Ton Pickup', capacity: '1000kg', features: ['Standard Bed'] },
          { id: 2, name: '2-Ton Truck', capacity: '2000kg', features: ['Enclosed'] },
          { id: 3, name: '3-Ton Truck', capacity: '3000kg', features: ['Hydraulic Lift'] },
          { id: 4, name: '5-Ton Truck', capacity: '5000kg', features: ['Tail Lift', 'Side Gate'] }
        ],
        transporters: await transporterService.getAllTransporters()
      },
      error: null
    };
  },

  // Assign transport to request
  async assignTransport(requestId, transportData) {
    return await relocationService.updateRequestStatus(requestId, 'In Progress', {
      transport_details: JSON.stringify(transportData)
    });
  }
};
