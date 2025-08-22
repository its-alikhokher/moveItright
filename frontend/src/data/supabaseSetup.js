// Supabase setup script for asset tags and related tables
import { supabase } from '../lib/supabase';
import { testAssetTags } from './assetTagList';
import { locations, assetCategories, approvedTransporters } from './mockData';

export const setupSupabaseDatabase = async () => {
  try {
    console.log('Setting up Supabase database...');

    // Create locations table if it doesn't exist
    const { error: locationsError } = await supabase.rpc('create_locations_table', {});
    if (locationsError && !locationsError.message.includes('already exists')) {
      console.error('Error creating locations table:', locationsError);
    }

    // Create asset categories table if it doesn't exist
    const { error: categoriesError } = await supabase.rpc('create_asset_categories_table', {});
    if (categoriesError && !categoriesError.message.includes('already exists')) {
      console.error('Error creating asset categories table:', categoriesError);
    }

    // Create asset tags table if it doesn't exist
    const { error: tagsError } = await supabase.rpc('create_asset_tags_table', {});
    if (tagsError && !tagsError.message.includes('already exists')) {
      console.error('Error creating asset tags table:', tagsError);
    }
    
    // Create transporters table if it doesn't exist
    const { error: transportersError } = await supabase.rpc('create_transporters_table', {});
    if (transportersError && !transportersError.message.includes('already exists')) {
      console.error('Error creating transporters table:', transportersError);
    }

    // Insert locations data
    const { error: locationsInsertError } = await supabase
      .from('locations_ar2024')
      .upsert(locations.map(loc => ({
        id: loc.id,
        name: loc.name,
        code: loc.code,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })), { onConflict: 'id' });

    if (locationsInsertError) {
      console.error('Error inserting locations:', locationsInsertError);
    } else {
      console.log('Locations data inserted successfully');
    }

    // Insert asset categories data
    const { error: categoriesInsertError } = await supabase
      .from('asset_categories_ar2024')
      .upsert(assetCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })), { onConflict: 'id' });

    if (categoriesInsertError) {
      console.error('Error inserting categories:', categoriesInsertError);
    } else {
      console.log('Asset categories data inserted successfully');
    }
    
    // Insert transporters data
    const { error: transportersInsertError } = await supabase
      .from('transporters_ar2024')
      .upsert(approvedTransporters.map(t => ({
        id: t.id,
        name: t.name,
        contact_person: t.contactPerson,
        contact_number: t.phone,
        email: t.email,
        specializations: t.specializations.join(', '),
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })), { onConflict: 'id' });

    if (transportersInsertError) {
      console.error('Error inserting transporters:', transportersInsertError);
    } else {
      console.log('Transporters data inserted successfully');
    }

    // Insert asset tags data
    const { error: tagsInsertError } = await supabase
      .from('asset_tags_ar2024')
      .upsert(testAssetTags.map(tag => ({
        tag_id: tag.tagId,
        name: tag.name,
        category: tag.category,
        category_id: tag.categoryId,
        location: tag.location,
        location_id: tag.locationId,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })), { onConflict: 'tag_id' });

    if (tagsInsertError) {
      console.error('Error inserting asset tags:', tagsInsertError);
    } else {
      console.log('Asset tags data inserted successfully');
    }

    console.log('Database setup completed successfully!');
    return true;

  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
};

// Function to verify data exists
export const verifyDatabaseSetup = async () => {
  try {
    // Check locations
    const { data: locations, error: locError } = await supabase
      .from('locations_ar2024')
      .select('*')
      .limit(5);

    // Check categories  
    const { data: categories, error: catError } = await supabase
      .from('asset_categories_ar2024')
      .select('*')
      .limit(5);

    // Check asset tags
    const { data: tags, error: tagsError } = await supabase
      .from('asset_tags_ar2024')
      .select('*')
      .limit(5);
      
    // Check transporters
    const { data: transporters, error: transpError } = await supabase
      .from('transporters_ar2024')
      .select('*')
      .limit(5);

    console.log('Database verification:');
    console.log('Locations count:', locations?.length || 0);
    console.log('Categories count:', categories?.length || 0);
    console.log('Asset tags count:', tags?.length || 0);
    console.log('Transporters count:', transporters?.length || 0);

    return {
      locations: locations?.length || 0,
      categories: categories?.length || 0,
      tags: tags?.length || 0,
      transporters: transporters?.length || 0,
      errors: { locError, catError, tagsError, transpError }
    };

  } catch (error) {
    console.error('Error verifying database:', error);
    return null;
  }
};