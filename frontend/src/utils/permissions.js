// Permission utility functions for role-based access control

/**
 * Check if user has a specific permission
 * @param {Object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

/**
 * Check if user can access a specific location
 * @param {Object} user - User object
 * @param {number} locationId - Location ID to check
 * @returns {boolean}
 */
export const canAccessLocation = (user, locationId) => {
  if (!user) return false;
  
  // System admin can access all locations
  if (user.role === 'system_admin' || user.role === 'transport_admin') {
    return true;
  }
  
  // Check if user has access to this specific location
  return user.assignedLocations && user.assignedLocations.includes(locationId);
};

/**
 * Check if user can access a specific category
 * @param {Object} user - User object
 * @param {number} categoryId - Category ID to check
 * @returns {boolean}
 */
export const canAccessCategory = (user, categoryId) => {
  if (!user) return false;
  
  // System admin can access all categories
  if (user.role === 'system_admin' || user.role === 'transport_admin') {
    return true;
  }
  
  // Check if user has access to this specific category
  return user.assignedCategories && user.assignedCategories.includes(categoryId);
};

/**
 * Check if user can create requests
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canCreateRequest = (user) => {
  return hasPermission(user, 'create_request') || user.role === 'custodian';
};

/**
 * Check if user can approve requests
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canApproveRequests = (user) => {
  return hasPermission(user, 'approve_requests') || user.role === 'hod';
};

/**
 * Check if user can final approve requests
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canFinalApproveRequests = (user) => {
  return hasPermission(user, 'final_approve_requests') || user.role === 'asset_manager';
};

/**
 * Check if user can assign transport
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canAssignTransport = (user) => {
  return hasPermission(user, 'assign_transport') || user.role === 'transport_admin';
};

/**
 * Check if user can manage system settings
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const canManageSystem = (user) => {
  return hasPermission(user, 'manage_system') || user.role === 'system_admin';
};

/**
 * Get filtered requests based on user role and permissions
 * @param {Array} requests - All requests
 * @param {Object} user - Current user
 * @returns {Array} Filtered requests
 */
export const getFilteredRequests = (requests, user) => {
  if (!user || !requests) return [];
  
  switch (user.role) {
    case 'system_admin':
      // System admin can see all requests
      return requests;
      
    case 'custodian':
      // Custodians can only see their own requests
      return requests.filter(req => req.requestedByUserId === user.id);
      
    case 'transport_admin':
      // Transport admin can see requests needing transport assignment
      return requests.filter(req => 
        req.status === 'Pending Admin Transport' || 
        req.status === 'Transport Arranged' ||
        req.status === 'External Transport Required'
      );
      
    case 'hod':
      // HODs can see requests assigned to them for approval
      return requests.filter(req => 
        req.assignedHODId === user.id && 
        (req.status === 'Pending HOD Approval' || req.status === 'HOD Approved')
      );
      
    case 'asset_manager':
      // Asset managers can see requests in their category/location combination
      return requests.filter(req => {
        const asset = req;
        const hasLocationAccess = user.assignedLocations.length === 0 || 
          user.assignedLocations.some(locId => 
            req.fromLocation.includes(getLocationNameById(locId)) ||
            req.toLocation.includes(getLocationNameById(locId))
          );
        const hasCategoryAccess = user.assignedCategories.length === 0 ||
          user.assignedCategories.some(catId => 
            getCategoryNameById(catId) === req.assetCategory
          );
        
        return hasLocationAccess && hasCategoryAccess && 
          (req.status === 'Pending Manager Approval' || req.status === 'Manager Approved');
      });
      
    default:
      return [];
  }
};

/**
 * Get user's dashboard configuration based on role
 * @param {Object} user - Current user
 * @returns {Object} Dashboard configuration
 */
export const getDashboardConfig = (user) => {
  if (!user) return null;
  
  const baseConfig = {
    canCreateRequests: canCreateRequest(user),
    canApproveRequests: canApproveRequests(user),
    canFinalApprove: canFinalApproveRequests(user),
    canAssignTransport: canAssignTransport(user),
    canManageSystem: canManageSystem(user),
    showAllRequests: user.role === 'system_admin',
    showTransportQueue: user.role === 'transport_admin',
    showApprovalQueue: user.role === 'hod' || user.role === 'asset_manager'
  };
  
  return baseConfig;
};

/**
 * Check if user can view specific request
 * @param {Object} request - Request object
 * @param {Object} user - Current user
 * @returns {boolean}
 */
export const canViewRequest = (request, user) => {
  if (!user || !request) return false;
  
  // System admin can view all
  if (user.role === 'system_admin') return true;
  
  // Users can view their own requests
  if (request.requestedByUserId === user.id) return true;
  
  // Transport admin can view transport-related requests
  if (user.role === 'transport_admin' && 
      ['Pending Admin Transport', 'Transport Arranged', 'External Transport Required'].includes(request.status)) {
    return true;
  }
  
  // HODs can view requests assigned to them
  if (user.role === 'hod' && request.assignedHODId === user.id) return true;
  
  // Asset managers can view requests in their domain
  if (user.role === 'asset_manager' && request.assignedManagerId === user.id) return true;
  
  return false;
};

// Helper functions (these would normally come from your data service)
const getLocationNameById = (id) => {
  const locations = [
    { id: 1, name: 'Main Office - Floor 1' },
    { id: 2, name: 'Main Office - Floor 2' },
    { id: 3, name: 'Main Office - Floor 3' },
    { id: 4, name: 'Warehouse A' },
    { id: 5, name: 'Warehouse B' },
    { id: 6, name: 'Branch Office - Downtown' },
    { id: 7, name: 'Branch Office - Uptown' },
    { id: 8, name: 'Storage Facility' }
  ];
  const location = locations.find(loc => loc.id === id);
  return location ? location.name : '';
};

const getCategoryNameById = (id) => {
  const categories = [
    { id: 1, name: 'Furniture' },
    { id: 2, name: 'IT Equipment' },
    { id: 3, name: 'Office Equipment' },
    { id: 4, name: 'Vehicles' },
    { id: 5, name: 'Machinery' },
    { id: 6, name: 'Medical Equipment' }
  ];
  const category = categories.find(cat => cat.id === id);
  return category ? category.name : '';
};