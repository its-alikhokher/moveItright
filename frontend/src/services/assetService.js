import { supabase } from '../lib/supabase';
import { locations, assetCategories, fixedAssets } from '../data/mockData';
import { testAssetTags } from '../data/assetTagList';
import { approvedTransporters } from '../data/mockData';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabase.supabaseUrl !== 'https://your-project-id.supabase.co';
};

// Location services
export const locationService = {
  // Get all locations from Oracle EBS (via Supabase)
  async getAllLocations() {
    if (!isSupabaseConfigured()) {
      // Return mock data if Supabase not configured
      return { data: locations, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('locations_ar2024')
        .select('*')
        .eq('is_active', true)
        .order('name');

      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching locations:', error);
      return { data: locations, error: null }; // Fallback to mock data
    }
  },

  // Get location by ID
  async getLocationById(id) {
    if (!isSupabaseConfigured()) {
      const location = locations.find(loc => loc.id === parseInt(id));
      return { data: location, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('locations_ar2024')
        .select('*')
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error fetching location:', error);
      const location = locations.find(loc => loc.id === parseInt(id));
      return { data: location, error: null };
    }
  }
};

// Asset Category services
export const categoryService = {
  // Get all asset categories
  async getAllCategories() {
    if (!isSupabaseConfigured()) {
      return { data: assetCategories, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('asset_categories_ar2024')
        .select('*')
        .eq('is_active', true)
        .order('name');

      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: assetCategories, error: null };
    }
  },

  // Get category by ID
  async getCategoryById(id) {
    if (!isSupabaseConfigured()) {
      const category = assetCategories.find(cat => cat.id === parseInt(id));
      return { data: category, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('asset_categories_ar2024')
        .select('*')
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error fetching category:', error);
      const category = assetCategories.find(cat => cat.id === parseInt(id));
      return { data: category, error: null };
    }
  }
};

// Transporter services
export const transporterService = {
  // Get all transporters
  async getAllTransporters() {
    if (!isSupabaseConfigured()) {
      return { 
        data: approvedTransporters.map(t => ({
          id: t.id,
          name: t.name,
          contact_person: t.contactPerson,
          contact_number: t.phone,
          email: t.email,
          specializations: t.specializations.join(', ')
        })), 
        error: null 
      };
    }

    try {
      const { data, error } = await supabase
        .from('transporters_ar2024')
        .select('*')
        .eq('is_active', true)
        .order('name');

      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching transporters:', error);
      return { 
        data: approvedTransporters.map(t => ({
          id: t.id,
          name: t.name,
          contact_person: t.contactPerson,
          contact_number: t.phone,
          email: t.email,
          specializations: t.specializations.join(', ')
        })), 
        error: null 
      };
    }
  },

  // Get transporter by ID
  async getTransporterById(id) {
    if (!isSupabaseConfigured()) {
      const transporter = approvedTransporters.find(t => t.id === parseInt(id));
      if (!transporter) return { data: null, error: "Transporter not found" };
      
      return { 
        data: {
          id: transporter.id,
          name: transporter.name,
          contact_person: transporter.contactPerson,
          contact_number: transporter.phone,
          email: transporter.email,
          specializations: transporter.specializations.join(', ')
        }, 
        error: null 
      };
    }

    try {
      const { data, error } = await supabase
        .from('transporters_ar2024')
        .select('*')
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error fetching transporter:', error);
      const transporter = approvedTransporters.find(t => t.id === parseInt(id));
      if (!transporter) return { data: null, error: "Transporter not found" };
      
      return { 
        data: {
          id: transporter.id,
          name: transporter.name,
          contact_person: transporter.contactPerson,
          contact_number: transporter.phone,
          email: transporter.email,
          specializations: transporter.specializations.join(', ')
        }, 
        error: null 
      };
    }
  }
};

// Fixed Asset services
export const assetService = {
  // Get assets by location (and optionally by category)
  async getAssetsByLocation(locationId, categoryId = null) {
    if (!isSupabaseConfigured()) {
      let filteredAssets = fixedAssets.filter(asset => asset.locationId === parseInt(locationId));
      if (categoryId) {
        filteredAssets = filteredAssets.filter(asset => asset.categoryId === parseInt(categoryId));
      }
      return { data: filteredAssets, error: null };
    }

    try {
      let query = supabase
        .from('fixed_assets_ar2024')
        .select(`
          *,
          category:asset_categories_ar2024(name,code),
          location:locations_ar2024(name,code)
        `)
        .eq('location_id', locationId)
        .eq('is_active', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('name');
      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching assets:', error);
      let filteredAssets = fixedAssets.filter(asset => asset.locationId === parseInt(locationId));
      if (categoryId) {
        filteredAssets = filteredAssets.filter(asset => asset.categoryId === parseInt(categoryId));
      }
      return { data: filteredAssets, error: null };
    }
  },

  // Get asset by tag number (Oracle EBS lookup)
  async getAssetByTagNumber(tagNumber) {
    if (!isSupabaseConfigured()) {
      // First try to find it in the asset tags list
      const assetTag = testAssetTags.find(tag => tag.tagId === tagNumber);
      if (assetTag) {
        // Create a synthetic asset object based on the tag
        return {
          data: {
            id: parseInt(tagNumber.split('-')[2]),
            name: assetTag.name,
            code: tagNumber.split('-')[0] + '-' + tagNumber.split('-')[1],
            categoryId: assetTag.categoryId,
            category: assetTag.category,
            locationId: assetTag.locationId,
            location: assetTag.location
          },
          error: null
        };
      }

      // Fallback to fixed assets
      const asset = fixedAssets.find(
        asset => `${asset.code}-${asset.id.toString().padStart(4, '0')}` === tagNumber
      );
      return { data: asset, error: null };
    }

    try {
      // First try to look up in the asset tags table
      let { data: assetTag, error: tagError } = await supabase
        .from('asset_tags_ar2024')
        .select('*')
        .eq('tag_id', tagNumber)
        .single();

      if (!tagError && assetTag) {
        // Create a synthetic asset object based on the tag
        return {
          data: {
            id: parseInt(tagNumber.split('-')[2]),
            name: assetTag.name,
            code: tagNumber.split('-')[0] + '-' + tagNumber.split('-')[1],
            categoryId: assetTag.category_id,
            category: assetTag.category,
            locationId: assetTag.location_id,
            location: assetTag.location
          },
          error: null
        };
      }

      // If not found in asset_tags_ar2024, try the fixed_assets_ar2024 table
      const { data, error } = await supabase
        .from('fixed_assets_ar2024')
        .select(`
          *,
          category:asset_categories_ar2024(name,code),
          location:locations_ar2024(name,code)
        `)
        .eq('tag_number', tagNumber)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching asset by tag:', error);
        // Fallback to mock data
        const asset = fixedAssets.find(
          asset => `${asset.code}-${asset.id.toString().padStart(4, '0')}` === tagNumber
        );
        
        if (!asset) {
          // As a last resort, check the testAssetTags
          const assetTag = testAssetTags.find(tag => tag.tagId === tagNumber);
          if (assetTag) {
            return {
              data: {
                id: parseInt(tagNumber.split('-')[2]),
                name: assetTag.name,
                code: tagNumber.split('-')[0] + '-' + tagNumber.split('-')[1],
                categoryId: assetTag.categoryId,
                category: assetTag.category,
                locationId: assetTag.locationId,
                location: assetTag.location
              },
              error: null
            };
          }
        }
        return { data: asset, error: null };
      }

      return { data, error };
    } catch (error) {
      console.error('Error fetching asset by tag:', error);
      // Fallback to mock data
      const assetTag = testAssetTags.find(tag => tag.tagId === tagNumber);
      if (assetTag) {
        return {
          data: {
            id: parseInt(tagNumber.split('-')[2]),
            name: assetTag.name,
            code: tagNumber.split('-')[0] + '-' + tagNumber.split('-')[1],
            categoryId: assetTag.categoryId,
            category: assetTag.category,
            locationId: assetTag.locationId,
            location: assetTag.location
          },
          error: null
        };
      }
      
      const asset = fixedAssets.find(
        asset => `${asset.code}-${asset.id.toString().padStart(4, '0')}` === tagNumber
      );
      return { data: asset, error: null };
    }
  },

  // Get asset by ID
  async getAssetById(id) {
    if (!isSupabaseConfigured()) {
      const asset = fixedAssets.find(asset => asset.id === parseInt(id));
      return { data: asset, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('fixed_assets_ar2024')
        .select(`
          *,
          category:asset_categories_ar2024(name,code),
          location:locations_ar2024(name,code)
        `)
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error fetching asset:', error);
      const asset = fixedAssets.find(asset => asset.id === parseInt(id));
      return { data: asset, error: null };
    }
  },

  // Search assets by name or code
  async searchAssets(searchTerm, locationId = null, categoryId = null) {
    if (!isSupabaseConfigured()) {
      let filteredAssets = fixedAssets.filter(
        asset => 
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          asset.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (locationId) {
        filteredAssets = filteredAssets.filter(asset => asset.locationId === parseInt(locationId));
      }
      
      if (categoryId) {
        filteredAssets = filteredAssets.filter(asset => asset.categoryId === parseInt(categoryId));
      }
      
      return { data: filteredAssets, error: null };
    }

    try {
      let query = supabase
        .from('fixed_assets_ar2024')
        .select(`
          *,
          category:asset_categories_ar2024(name,code),
          location:locations_ar2024(name,code)
        `)
        .or(`name.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%,tag_number.ilike.%${searchTerm}%`)
        .eq('is_active', true);

      if (locationId) {
        query = query.eq('location_id', locationId);
      }
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('name').limit(10);
      return { data: data || [], error };
    } catch (error) {
      console.error('Error searching assets:', error);
      let filteredAssets = fixedAssets.filter(
        asset => 
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          asset.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (locationId) {
        filteredAssets = filteredAssets.filter(asset => asset.locationId === parseInt(locationId));
      }
      
      if (categoryId) {
        filteredAssets = filteredAssets.filter(asset => asset.categoryId === parseInt(categoryId));
      }
      
      return { data: filteredAssets.slice(0, 10), error: null };
    }
  }
};

// Relocation Request services
export const relocationService = {
  // Create new relocation request
  async createRequest(requestData) {
    if (!isSupabaseConfigured()) {
      // Mock implementation
      const newRequest = {
        id: Date.now(),
        request_id: `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        ...requestData,
        status: 'Pending Approval',
        request_date: new Date().toISOString()
      };
      console.log('Mock request created:', newRequest);
      return { data: newRequest, error: null };
    }

    try {
      // Generate request ID
      const requestId = `REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
      
      const { data, error } = await supabase
        .from('relocation_requests_ar2024')
        .insert({
          request_id: requestId,
          ...requestData
        })
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error creating request:', error);
      return { data: null, error };
    }
  },

  // Get all requests
  async getAllRequests() {
    if (!isSupabaseConfigured()) {
      // Return mock data
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('relocation_requests_ar2024')
        .select(`
          *,
          asset:fixed_assets_ar2024(name,code,tag_number),
          from_location:from_location_id(name,code),
          to_location:to_location_id(name,code)
        `)
        .order('request_date', { ascending: false });

      return { data: data || [], error };
    } catch (error) {
      console.error('Error fetching requests:', error);
      return { data: [], error: null };
    }
  },

  // Update request status
  async updateRequestStatus(requestId, status, updateData = {}) {
    if (!isSupabaseConfigured()) {
      console.log('Mock status update:', { requestId, status, updateData });
      return { data: { id: requestId, status, ...updateData }, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('relocation_requests_ar2024')
        .update({ 
          status, 
          updated_at: new Date().toISOString(),
          ...updateData 
        })
        .eq('id', requestId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      console.error('Error updating request status:', error);
      return { data: null, error };
    }
  }
};

// Oracle EBS Integration Service (mock for now)
export const oracleService = {
  // Simulate Oracle EBS asset lookup
  async lookupAssetInOracle(tagNumber, locationId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use the asset service to find the asset
    const { data: asset, error } = await assetService.getAssetByTagNumber(tagNumber);

    if (!asset) {
      return { data: null, error: 'Asset not found in Oracle EBS' };
    }

    // Verify location matches
    if (asset.locationId !== parseInt(locationId) && asset.location_id !== parseInt(locationId)) {
      const { data: assetLocation } = await locationService.getLocationById(asset.locationId || asset.location_id);
      return { 
        data: null, 
        error: `Asset not found at selected location. This asset is located at ${assetLocation?.name}.` 
      };
    }

    return { data: asset, error: null };
  },

  // Validate asset against category (if provided)
  async validateAssetCategory(asset, categoryId) {
    if (!categoryId) return { valid: true, error: null };

    const assetCategoryId = asset.categoryId || asset.category_id;
    if (assetCategoryId !== parseInt(categoryId)) {
      const { data: category } = await categoryService.getCategoryById(categoryId);
      const assetCategory = asset.category?.name || asset.category;
      return { 
        valid: false, 
        error: `Asset category mismatch. This asset belongs to ${assetCategory} category, not ${category?.name}.` 
      };
    }

    return { valid: true, error: null };
  }
};