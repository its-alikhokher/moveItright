import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { testAssetTags } from '../data/assetTagList';
import { downloadAssetTagsCSV } from '../utils/assetTagExport';

const AssetTagListTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Get unique locations and categories for filter dropdowns
  const locations = [...new Set(testAssetTags.map(tag => tag.location))];
  const categories = [...new Set(testAssetTags.map(tag => tag.category))];
  
  // Filter the asset tags based on search and filters
  const filteredTags = testAssetTags.filter(tag => {
    const matchesSearch = searchTerm === '' || 
      tag.tagId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = filterLocation === '' || tag.location === filterLocation;
    const matchesCategory = filterCategory === '' || tag.category === filterCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Asset Tag List for Testing</h2>
        <button 
          onClick={downloadAssetTagsCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <SafeIcon icon={FiIcons.FiDownload} className="mr-2" />
          Export CSV
        </button>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tag ID or name"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SafeIcon 
              icon={FiIcons.FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Location</label>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset Tag ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTags.map((tag, index) => (
              <motion.tr 
                key={tag.tagId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                  {tag.tagId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {tag.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tag.location}
                </td>
              </motion.tr>
            ))}
            
            {filteredTags.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No asset tags found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredTags.length} of {testAssetTags.length} asset tags
      </div>
    </div>
  );
};

export default AssetTagListTable;