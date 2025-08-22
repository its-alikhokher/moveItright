import { testAssetTags } from '../data/assetTagList';
import { supabase } from '../lib/supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabase.supabaseUrl !== 'https://your-project-id.supabase.co';
};

/**
 * Asset Tag Service for testing
 * This service provides methods to interact with the asset tag list
 */
export const assetTagService = {
  /**
   * Get all asset tags
   * @returns {Array} List of all asset tags
   */
  async getAllAssetTags() {
    if (!isSupabaseConfigured()) {
      return testAssetTags;
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .order('location_id');
        
      if (error) {
        console.error('Error fetching asset tags:', error);
        return testAssetTags;
      }
      
      return data || testAssetTags;
    } catch (err) {
      console.error('Error in getAllAssetTags:', err);
      return testAssetTags;
    }
  },

  /**
   * Get asset tags by location
   * @param {number} locationId - The location ID to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByLocation(locationId) {
    if (!isSupabaseConfigured()) {
      return testAssetTags.filter(tag => tag.locationId === locationId);
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .eq('location_id', locationId)
        .order('tag_id');
        
      if (error) {
        console.error('Error fetching asset tags by location:', error);
        return testAssetTags.filter(tag => tag.locationId === locationId);
      }
      
      return data || testAssetTags.filter(tag => tag.locationId === locationId);
    } catch (err) {
      console.error('Error in getAssetTagsByLocation:', err);
      return testAssetTags.filter(tag => tag.locationId === locationId);
    }
  },

  /**
   * Get asset tags by category
   * @param {number} categoryId - The category ID to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByCategory(categoryId) {
    if (!isSupabaseConfigured()) {
      return testAssetTags.filter(tag => tag.categoryId === categoryId);
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .eq('category_id', categoryId)
        .order('tag_id');
        
      if (error) {
        console.error('Error fetching asset tags by category:', error);
        return testAssetTags.filter(tag => tag.categoryId === categoryId);
      }
      
      return data || testAssetTags.filter(tag => tag.categoryId === categoryId);
    } catch (err) {
      console.error('Error in getAssetTagsByCategory:', err);
      return testAssetTags.filter(tag => tag.categoryId === categoryId);
    }
  },

  /**
   * Get asset tags by location and category
   * @param {number} locationId - The location ID to filter by
   * @param {number} categoryId - The category ID to filter by
   * @returns {Array} Filtered list of asset tags
   */
  async getAssetTagsByLocationAndCategory(locationId, categoryId) {
    if (!isSupabaseConfigured()) {
      return testAssetTags.filter(
        tag => tag.locationId === locationId && tag.categoryId === categoryId
      );
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .eq('location_id', locationId)
        .eq('category_id', categoryId)
        .order('tag_id');
        
      if (error) {
        console.error('Error fetching asset tags by location and category:', error);
        return testAssetTags.filter(
          tag => tag.locationId === locationId && tag.categoryId === categoryId
        );
      }
      
      return data || testAssetTags.filter(
        tag => tag.locationId === locationId && tag.categoryId === categoryId
      );
    } catch (err) {
      console.error('Error in getAssetTagsByLocationAndCategory:', err);
      return testAssetTags.filter(
        tag => tag.locationId === locationId && tag.categoryId === categoryId
      );
    }
  },

  /**
   * Get asset tag by ID
   * @param {string} tagId - The asset tag ID to find
   * @returns {Object|null} The asset tag object or null if not found
   */
  async getAssetTagById(tagId) {
    if (!isSupabaseConfigured()) {
      return testAssetTags.find(tag => tag.tagId === tagId) || null;
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .eq('tag_id', tagId)
        .single();
        
      if (error) {
        console.error('Error fetching asset tag by ID:', error);
        return testAssetTags.find(tag => tag.tagId === tagId) || null;
      }
      
      return data || testAssetTags.find(tag => tag.tagId === tagId) || null;
    } catch (err) {
      console.error('Error in getAssetTagById:', err);
      return testAssetTags.find(tag => tag.tagId === tagId) || null;
    }
  },

  /**
   * Search asset tags by name or tag ID
   * @param {string} query - The search query
   * @returns {Array} Filtered list of asset tags
   */
  async searchAssetTags(query) {
    const lowerQuery = query.toLowerCase();
    
    if (!isSupabaseConfigured()) {
      return testAssetTags.filter(
        tag => tag.name.toLowerCase().includes(lowerQuery) || 
               tag.tagId.toLowerCase().includes(lowerQuery)
      );
    }
    
    try {
      const { data, error } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .or(`name.ilike.%${query}%,tag_id.ilike.%${query}%`)
        .order('tag_id');
        
      if (error) {
        console.error('Error searching asset tags:', error);
        return testAssetTags.filter(
          tag => tag.name.toLowerCase().includes(lowerQuery) || 
                tag.tagId.toLowerCase().includes(lowerQuery)
        );
      }
      
      return data || testAssetTags.filter(
        tag => tag.name.toLowerCase().includes(lowerQuery) || 
              tag.tagId.toLowerCase().includes(lowerQuery)
      );
    } catch (err) {
      console.error('Error in searchAssetTags:', err);
      return testAssetTags.filter(
        tag => tag.name.toLowerCase().includes(lowerQuery) || 
              tag.tagId.toLowerCase().includes(lowerQuery)
      );
    }
  }
};