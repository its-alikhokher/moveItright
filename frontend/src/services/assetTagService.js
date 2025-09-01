// Asset Tag Service for Frappe integration
// This service provides methods to interact with Frappe ERPNext for asset tag management

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

/**
 * Asset Tag Service for Frappe integration
 * This service provides methods to interact with asset tags in Frappe ERPNext
 */
export const assetTagService = {
  /**
   * Get all asset tags from Frappe
   * @returns {Array} List of all asset tags
   */
  async getAllAssetTags() {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: { docstatus: 1 }
    });
    
    return result.data || [];
  },

  /**
   * Get asset tags by location
   * @param {string} location - The location name to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByLocation(location) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: { 
        location: location,
        docstatus: 1 
      }
    });
    
    return result.data || [];
  },

  /**
   * Get asset tags by category
   * @param {string} category - The category name to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByCategory(category) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: { 
        asset_category: category,
        docstatus: 1 
      }
    });
    
    return result.data || [];
  },

  /**
   * Get asset tags by location and category
   * @param {string} location - The location name to filter by
   * @param {string} category - The category name to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByLocationAndCategory(location, category) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: { 
        location: location,
        asset_category: category,
        docstatus: 1 
      }
    });
    
    return result.data || [];
  },

  /**
   * Get asset tag by ID/name
   * @param {string} assetName - The asset name/ID to find
   * @returns {Object|null} The asset object or null if not found
   */
  async getAssetTagById(assetName) {
    const result = await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Asset',
      name: assetName
    });
    
    return result.data || null;
  },

  /**
   * Search asset tags by name or asset ID
   * @param {string} query - The search query
   * @returns {Array} Filtered list of asset tags
   */
  async searchAssetTags(query) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset',
      fields: ['name', 'asset_name', 'asset_category', 'location', 'status', 'item_code'],
      filters: { docstatus: 1 },
      or_filters: [
        { asset_name: ['like', `%${query}%`] },
        { name: ['like', `%${query}%`] },
        { item_code: ['like', `%${query}%`] }
      ],
      limit: 20
    });
    
    return result.data || [];
  },

  /**
   * Get asset details with related information
   * @param {string} assetName - The asset name/ID
   * @returns {Object|null} Detailed asset information
   */
  async getAssetDetails(assetName) {
    const result = await frappeAPI('GET', 'frappe.client.get', {
      doctype: 'Asset',
      name: assetName
    });
    
    return result.data || null;
  },

  /**
   * Check asset availability for relocation
   * @param {string} assetName - The asset name/ID
   * @returns {Object} Availability status and details
   */
  async checkAssetAvailability(assetName) {
    // This would call a custom API method that checks if asset is available for relocation
    const result = await frappeAPI('GET', 'moveitright.api.custom_api.check_asset_availability', {
      asset: assetName
    });
    
    return result.data || { available: false, reason: 'Unknown error' };
  },

  /**
   * Get asset movement history
   * @param {string} assetName - The asset name/ID
   * @returns {Array} List of asset movements
   */
  async getAssetMovementHistory(assetName) {
    const result = await frappeAPI('GET', 'frappe.client.get_list', {
      doctype: 'Asset Movement',
      fields: ['name', 'from_location', 'to_location', 'expected_date', 'status', 'purpose'],
      filters: { asset: assetName },
      order_by: 'creation desc'
    });
    
    return result.data || [];
  }
};
