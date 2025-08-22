import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { setupSupabaseDatabase, verifyDatabaseSetup } from '../data/supabaseSetup';

const DatabaseSetup = () => {
  const [isSetup, setIsSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setupResult, setSetupResult] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSetupDatabase = async () => {
    setIsLoading(true);
    try {
      const result = await setupSupabaseDatabase();
      setSetupResult(result);
      if (result) {
        const verification = await verifyDatabaseSetup();
        setVerificationResult(verification);
        setIsSetup(true);
      }
    } catch (error) {
      console.error('Setup failed:', error);
      setSetupResult(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyDatabase = async () => {
    setIsLoading(true);
    try {
      const verification = await verifyDatabaseSetup();
      setVerificationResult(verification);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <SafeIcon icon={FiIcons.FiDatabase} className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Supabase Database Setup
          </h1>
          <p className="text-gray-600">
            Set up your Supabase database with asset tags and related data
          </p>
        </div>

        <div className="space-y-6">
          {/* Setup Button */}
          <div className="text-center">
            <button
              onClick={handleSetupDatabase}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center mx-auto"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <SafeIcon icon={FiIcons.FiPlay} className="mr-2" />
              )}
              {isLoading ? 'Setting up...' : 'Setup Database'}
            </button>
          </div>

          {/* Setup Result */}
          {setupResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-md ${
                setupResult 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center">
                <SafeIcon 
                  icon={setupResult ? FiIcons.FiCheckCircle : FiIcons.FiXCircle} 
                  className={`mr-2 ${setupResult ? 'text-green-600' : 'text-red-600'}`} 
                />
                <span className={setupResult ? 'text-green-800' : 'text-red-800'}>
                  {setupResult ? 'Database setup completed successfully!' : 'Database setup failed!'}
                </span>
              </div>
            </motion.div>
          )}

          {/* Verification Results */}
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 p-4 rounded-md"
            >
              <h3 className="font-semibold text-blue-900 mb-3">Database Verification</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Locations:</span>
                  <span className="font-medium text-blue-900">{verificationResult.locations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Categories:</span>
                  <span className="font-medium text-blue-900">{verificationResult.categories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Asset Tags:</span>
                  <span className="font-medium text-blue-900">{verificationResult.tags}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verify Button */}
          <div className="text-center">
            <button
              onClick={handleVerifyDatabase}
              disabled={isLoading}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400 flex items-center mx-auto"
            >
              <SafeIcon icon={FiIcons.FiRefreshCw} className="mr-2" />
              Verify Database
            </button>
          </div>

          {/* Asset Tag Examples */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-900 mb-3">Test Asset Tags</h3>
            <p className="text-sm text-gray-600 mb-3">
              Once setup is complete, you can test with these asset tag IDs:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              <div className="bg-white p-2 rounded border">FUR-001-0001</div>
              <div className="bg-white p-2 rounded border">ITE-002-0001</div>
              <div className="bg-white p-2 rounded border">OFC-003-0001</div>
              <div className="bg-white p-2 rounded border">VEH-004-0001</div>
            </div>
          </div>

          {/* SQL Queries */}
          <details className="bg-gray-50 p-4 rounded-md">
            <summary className="font-semibold text-gray-900 cursor-pointer">
              Manual SQL Setup (if needed)
            </summary>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">1. Create Locations Table:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS locations_ar2024 (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE locations_ar2024 ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON locations_ar2024 
FOR SELECT USING (true);`}
                </pre>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">2. Create Asset Categories Table:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS asset_categories_ar2024 (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE asset_categories_ar2024 ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON asset_categories_ar2024 
FOR SELECT USING (true);`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">3. Create Asset Tags Table:</h4>
                <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS asset_tags_ar2024 (
  id SERIAL PRIMARY KEY,
  tag_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_id INTEGER REFERENCES asset_categories_ar2024(id),
  location TEXT NOT NULL,
  location_id INTEGER REFERENCES locations_ar2024(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE asset_tags_ar2024 ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON asset_tags_ar2024 
FOR SELECT USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_asset_tags_tag_id ON asset_tags_ar2024(tag_id);
CREATE INDEX IF NOT EXISTS idx_asset_tags_location_id ON asset_tags_ar2024(location_id);
CREATE INDEX IF NOT EXISTS idx_asset_tags_category_id ON asset_tags_ar2024(category_id);`}
                </pre>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;