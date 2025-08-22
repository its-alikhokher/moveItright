import { testAssetTags } from '../data/assetTagList';

/**
 * Generate CSV content for the asset tag list
 * @returns {string} CSV content
 */
export const generateAssetTagCSV = () => {
  // CSV header
  let csv = 'Tag ID,Name,Category,Location\n';
  
  // Add each asset tag as a row
  testAssetTags.forEach(tag => {
    csv += `${tag.tagId},"${tag.name}",${tag.category},"${tag.location}"\n`;
  });
  
  return csv;
};

/**
 * Download asset tag list as CSV
 */
export const downloadAssetTagsCSV = () => {
  const csv = generateAssetTagCSV();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create download link and trigger click
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'asset_tags_list.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};