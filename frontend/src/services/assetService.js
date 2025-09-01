// Asset Service for Frappe integration using custom API functions
// This service provides methods to interact with custom MoveItRight APIs

// Frappe API helper function for custom endpoints
const frappeAPI = async (method, endpoint, data = null) => {
  let url = `/api/method/moveitright.api.custom_api.${endpoint}`;

  const config = {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // For GET requests, append data as query parameters
  if (method === 'GET' && data) {
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        params.append(key, JSON.stringify(data[key]));
      } else {
        params.append(key, data[key]);
      }
    });
    url += `?${params.toString()}`;
  }
  // For POST, PUT, etc., add data to body
  else if (data && method !== 'GET' && method !== 'HEAD') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
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

// Location services using custom APIs
export const locationService = {
  // Get all locations
  async getAllLocations() {
    return await frappeAPI('GET', 'get_locations');
  },

  // Get location by name (fallback to direct Frappe API)
  async getLocationByName(name) {
    return await frappeAPI('GET', 'get_locations', { name: name });
  }
};

// Asset Category services using custom APIs
export const categoryService = {
  // Get all asset categories
  async getAllCategories() {
    return await frappeAPI('GET', 'get_asset_categories');
  },

  // Get category by name (fallback)
  async getCategoryByName(name) {
    return await frappeAPI('GET', 'get_asset_categories', { name: name });
  }
};

// Asset services using custom APIs
export const assetService = {
  // Get assets by location and optionally by category
  async getAssetsByLocation(location, category = null) {
    return await frappeAPI('GET', 'get_assets_by_location', {
      location: location,
      category: category
    });
  },

  // Get asset by name/ID (fallback to location-based search)
  async getAssetByName(name) {
    return await frappeAPI('GET', 'search_assets', { search_term: name });
  },

  // Search assets by name or item code
  async searchAssets(searchTerm, location = null, category = null) {
    return await frappeAPI('GET', 'search_assets', {
      search_term: searchTerm,
      location: location,
      category: category
    });
  }
};

// Helper function to map workflow states to frontend status
const mapWorkflowStateToFrontend = (workflowState) => {
  const statusMap = {
    'Draft': 'Draft',
    'Awaiting Transport Allocation': 'Pending Transport',
    'External Transport Required': 'External Transport Required',
    'HOD Approval Pending': 'Pending HOD Approval',
    'HOD Approved': 'Pending Manager Approval', 
    'Request Approved': 'Approved',
    'Collected': 'In Transit',
    'Delivered': 'Delivered',
    'Closed': 'Completed',
    'HOD Rejected': 'Rejected by HOD',
    'Asset Manager Rejected': 'Rejected by Manager'
  };

  return statusMap[workflowState] || workflowState || 'Draft';
};

// Helper function to transform Asset Movement to frontend format
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
    transportType: 'Internal', // Can be enhanced based on remarks
    transport_vehicle_type: 1,
    requestedDate: movement.expected_date || movement.transaction_date,
    status: mapWorkflowStateToFrontend(movement.workflow_state),
    workflowState: movement.workflow_state || 'Draft',
    requestedBy: movement.owner || 'System User',
    requestedByUserId: 1,
    requestDate: movement.creation,
    comments: movement.remarks || '',
    
    // Available workflow actions for current user
    availableActions: movement.available_actions || [],
    
    // Transport details parsed from remarks
    transportDetails: {
      isInternal: true,
      vehicleId: null,
      vehicleType: 1,
      registration: null,
      driver: null,
      features: [],
      transporterId: null,
      transporterName: null,
      isDispatched: movement.workflow_state === 'Collected' || movement.workflow_state === 'Delivered'
    },
    
    // Approval status based on workflow state
    approvalStatus: {
      isApproved: movement.docstatus === 1,
      approvedBy: movement.modified_by || null,
      approvedDate: movement.modified || null,
      comments: movement.remarks || null
    },
    
    // Dispatch status based on workflow state
    dispatchStatus: {
      isDispatched: movement.workflow_state === 'Collected' || movement.workflow_state === 'Delivered',
      dispatchedBy: movement.workflow_state === 'Collected' ? 'Transport Administrator' : null,
      dispatchDate: movement.workflow_state === 'Collected' ? movement.modified : null,
      currentCustodianNotified: movement.workflow_state !== 'Draft',
      newCustodianNotified: movement.workflow_state !== 'Draft',
      estimatedArrival: movement.expected_date || null,
      completedDate: movement.workflow_state === 'Closed' ? movement.modified : null
    }
  };

  return frontendRequest;
};

// Relocation Request services using custom Asset Movement APIs
export const relocationService = {
  // Create new relocation request
  async createRequest(requestData) {
    const result = await frappeAPI('POST', 'create_asset_movement', {
      asset: requestData.asset,
      from_location: requestData.fromLocation,
      to_location: requestData.toLocation,
      expected_date: requestData.requestedDate,
      remarks: requestData.comments || ''
    });

    if (result.data && result.data.status === 'success') {
      return {
        data: transformAssetMovementToFrontend(result.data.data),
        error: null
      };
    }

    return result;
  },

  // Get all requests for current user
  async getUserRequests(user) {
    const result = await frappeAPI('GET', 'get_asset_movements_with_items');

    if (result.data && result.data.status === 'success') {
      const transformedRequests = result.data.data.map((movement, index) => 
        transformAssetMovementToFrontend(movement, index)
      );
      
      return { data: transformedRequests, error: null };
    }

    return { data: [], error: result.error || result.data?.message };
  },

  // Get all requests (for admins/managers)
  async getAllRequests() {
    const result = await frappeAPI('GET', 'get_asset_movements_with_items');

    if (result.data && result.data.status === 'success') {
      const transformedRequests = result.data.data.map((movement, index) => 
        transformAssetMovementToFrontend(movement, index)
      );
      
      return { data: transformedRequests, error: null };
    }

    return { data: [], error: result.error || result.data?.message };
  },

  // Apply workflow action to request
  async applyWorkflowAction(requestName, action) {
    return await frappeAPI('POST', 'apply_workflow_action', {
      movement_name: requestName,
      action: action
    });
  },

  // Update request status using workflow actions
  async updateRequestStatus(requestName, status, updateData = {}) {
    // Map frontend status to workflow actions
    const statusActionMap = {
      'Pending Transport': 'Submit Request',
      'Pending HOD Approval': 'Forward to HOD',
      'Pending Manager Approval': 'Approve', // HOD Approval
      'Approved': 'Approve', // Manager Approval
      'In Transit': 'Collect Asset',
      'Delivered': 'Deliver Asset',
      'Completed': 'Close Request',
      'Rejected by HOD': 'Reject',
      'Rejected by Manager': 'Reject'
    };

    const action = statusActionMap[status];
    
    if (action) {
      return await this.applyWorkflowAction(requestName, action);
    } else {
      return { data: null, error: 'Invalid status transition' };
    }
  },

  // Approve request (generic approval based on current state)
  async approveRequest(requestName) {
    return await this.applyWorkflowAction(requestName, 'Approve');
  },

  // Reject request
  async rejectRequest(requestName, reason = '') {
    // First save rejection reason
    if (reason) {
      await frappeAPI('POST', 'save_rejection_reason', {
        docname: requestName,
        reason: reason
      });
    }
    
    return await this.applyWorkflowAction(requestName, 'Reject');
  },

  // Get request details by ID
  async getRequestById(requestName) {
    const result = await frappeAPI('GET', 'get_asset_movements_with_items');

    if (result.data && result.data.status === 'success') {
      const movement = result.data.data.find(m => m.name === requestName);
      if (movement) {
        return {
          data: transformAssetMovementToFrontend(movement),
          error: null
        };
      }
    }

    return { data: null, error: 'Request not found' };
  },

  // Get available workflow actions for a request
  async getAvailableActions(requestName, currentState) {
    return await frappeAPI('GET', 'get_workflow_actions_for_user', {
      movement_name: requestName,
      current_state: currentState
    });
  }
};

// User and role services
export const userService = {
  // Get current user details
  async getCurrentUser() {
    return await frappeAPI('GET', 'get_current_user_info');
  },

  // Get user permissions (fallback implementation)
  async getUserPermissions(user) {
    return await frappeAPI('GET', 'get_current_user_info');
  }
};

// Transporter services using custom APIs
export const transporterService = {
  // Get all transporters/suppliers
  async getAllTransporters() {
    return await frappeAPI('GET', 'get_transporters');
  },

  // Get transporter by name
  async getTransporterById(name) {
    const result = await frappeAPI('GET', 'get_transporters');
    if (result.data && result.data.status === 'success') {
      const transporter = result.data.data.find(t => t.name === name);
      return { data: transporter, error: null };
    }
    return result;
  }
};

// Custom API for MoveItRight specific functions
export const moveItRightService = {
  // Get asset relocation requests with full details
  async getRelocationRequests(filters = {}) {
    return await relocationService.getAllRequests();
  },

  // Create asset relocation request with business logic
  async createRelocationRequest(requestData) {
    return await relocationService.createRequest(requestData);
  },

  // Process relocation request (approve/reject)
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
    const result = await frappeAPI('GET', 'get_user_dashboard_data');
    
    if (result.data && result.data.status === 'success') {
      const dashboardData = result.data.data;
      
      // Transform the data to match frontend expectations
      return {
        data: {
          totalRequests: dashboardData.total_requests || 0,
          pendingRequests: Object.values(dashboardData.states_breakdown || {})
            .reduce((total, count) => {
              return total + (typeof count === 'number' ? count : 0);
            }, 0) - (dashboardData.states_breakdown?.['Closed'] || 0),
          completedRequests: dashboardData.states_breakdown?.['Closed'] || 0,
          inProgressRequests: (dashboardData.states_breakdown?.['Collected'] || 0) + 
                             (dashboardData.states_breakdown?.['Delivered'] || 0),
          requests: dashboardData.recent_movements || [],
          userRoles: dashboardData.user_roles || [],
          statesBreakdown: dashboardData.states_breakdown || {},
          // Role-specific data
          pendingTransportAllocation: dashboardData.pending_transport_allocation || 0,
          inTransit: dashboardData.in_transit || 0,
          pendingHodApproval: dashboardData.pending_hod_approval || 0,
          pendingManagerApproval: dashboardData.pending_manager_approval || 0,
          myRequests: dashboardData.my_requests || 0,
          pendingCollection: dashboardData.pending_collection || 0,
          pendingClosure: dashboardData.pending_closure || 0
        },
        error: null
      };
    }

    return result;
  },

  // Get transport options
  async getTransportOptions() {
    const transportersResult = await transporterService.getAllTransporters();
    
    return {
      data: {
        vehicleTypes: [
          { id: 1, name: '1-Ton Pickup', capacity: '1000kg', features: ['Standard Bed'] },
          { id: 2, name: '2-Ton Truck', capacity: '2000kg', features: ['Enclosed'] },
          { id: 3, name: '3-Ton Truck', capacity: '3000kg', features: ['Hydraulic Lift'] },
          { id: 4, name: '5-Ton Truck', capacity: '5000kg', features: ['Tail Lift', 'Side Gate'] }
        ],
        transporters: transportersResult.data?.status === 'success' ? transportersResult.data.data : []
      },
      error: transportersResult.error
    };
  },

  // Assign transport to request
  async assignTransport(requestId, transportData) {
    return await frappeAPI('POST', 'assign_transport_details', {
      movement_name: requestId,
      transport_data: transportData
    });
  },

  // Apply workflow action (wrapper)
  async applyWorkflowAction(requestId, action) {
    return await relocationService.applyWorkflowAction(requestId, action);
  }
};
