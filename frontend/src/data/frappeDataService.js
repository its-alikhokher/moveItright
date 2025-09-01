// Frappe Data Service - Centralized data access for MoveItRight
// This service provides cached and optimized access to Frappe data

import { 
  locationService, 
  categoryService, 
  assetService, 
  userService,
  moveItRightService 
} from '../services/assetService.js';

// Cache for frequently accessed data
const dataCache = {
  locations: null,
  categories: null,
  users: null,
  cacheTimestamp: null,
  cacheTimeout: 5 * 60 * 1000 // 5 minutes
};

// Helper function to check if cache is valid
const isCacheValid = () => {
  if (!dataCache.cacheTimestamp) return false;
  return (Date.now() - dataCache.cacheTimestamp) < dataCache.cacheTimeout;
};

// Clear cache
const clearCache = () => {
  dataCache.locations = null;
  dataCache.categories = null;
  dataCache.users = null;
  dataCache.cacheTimestamp = null;
};

export const frappeDataService = {
  // Location data
  async getLocations(useCache = true) {
    if (useCache && isCacheValid() && dataCache.locations) {
      return { data: dataCache.locations, error: null };
    }

    const result = await locationService.getAllLocations();
    
    if (result.data && !result.error) {
      dataCache.locations = result.data;
      dataCache.cacheTimestamp = Date.now();
    }

    return result;
  },

  // Category data
  async getCategories(useCache = true) {
    if (useCache && isCacheValid() && dataCache.categories) {
      return { data: dataCache.categories, error: null };
    }

    const result = await categoryService.getAllCategories();
    
    if (result.data && !result.error) {
      dataCache.categories = result.data;
      dataCache.cacheTimestamp = Date.now();
    }

    return result;
  },

  // Asset data
  async getAssetsByLocation(location, category = null) {
    return await assetService.getAssetsByLocation(location, category);
  },

  async searchAssets(searchTerm, location = null, category = null) {
    return await assetService.searchAssets(searchTerm, location, category);
  },

  async getAssetDetails(assetName) {
    return await assetService.getAssetByName(assetName);
  },

  // User and authentication data
  async getCurrentUser() {
    return await userService.getCurrentUser();
  },

  async getUserPermissions(user) {
    return await userService.getUserPermissions(user);
  },

  // Relocation requests
  async getRelocationRequests(filters = {}) {
    return await moveItRightService.getRelocationRequests(filters);
  },

  async createRelocationRequest(requestData) {
    return await moveItRightService.createRelocationRequest(requestData);
  },

  async approveRelocationRequest(requestId, comments = '') {
    return await moveItRightService.processRelocationRequest(requestId, 'approve', comments);
  },

  async rejectRelocationRequest(requestId, comments = '') {
    return await moveItRightService.processRelocationRequest(requestId, 'reject', comments);
  },

  // Dashboard data
  async getDashboardData(role) {
    return await moveItRightService.getDashboardData(role);
  },

  // Transport management
  async getTransportOptions() {
    return await moveItRightService.getTransportOptions();
  },

  async assignTransport(requestId, transportData) {
    return await moveItRightService.assignTransport(requestId, transportData);
  },

  // Utility functions
  clearCache,
  
  // Initialize data service
  async initialize() {
    try {
      // Pre-load commonly used data
      await this.getLocations();
      await this.getCategories();
      
      console.log('Frappe data service initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing Frappe data service:', error);
      return false;
    }
  },

  // Get system configuration
  async getSystemConfig() {
    return await moveItRightService.getSystemConfig();
  },

  // Validation helpers
  async validateAssetLocation(assetName, expectedLocation) {
    const asset = await this.getAssetDetails(assetName);
    
    if (!asset.data) {
      return { valid: false, error: 'Asset not found' };
    }

    if (asset.data.location !== expectedLocation) {
      return { 
        valid: false, 
        error: `Asset is located at ${asset.data.location}, not ${expectedLocation}` 
      };
    }

    return { valid: true, error: null };
  },

  async validateUserPermissions(user, action, resource) {
    const permissions = await this.getUserPermissions(user);
    
    if (!permissions.data) {
      return { valid: false, error: 'Could not fetch user permissions' };
    }

    // Implement permission validation logic based on Frappe role permissions
    // This would be customized based on the specific permission structure
    return { valid: true, error: null };
  }
};

// Auto-initialize on module load
frappeDataService.initialize().catch(console.error);

export default frappeDataService;
