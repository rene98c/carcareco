import type { NextConfig } from "next";
import { URL } from 'url';

// Extract hostnames and protocols from your API URLs
const apiUrl = process.env.API_URL || 'http://localhost:15567';
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:15567';

// Parse the URLs to get the protocols and hostnames
const apiUrlObj = new URL(apiUrl);
const publicApiUrlObj = new URL(publicApiUrl);

// Create a map to store unique patterns (using string representation as key)
const patternsMap = new Map();

// Add patterns to the map
[apiUrlObj, publicApiUrlObj].forEach(urlObj => {
  const pattern = {
    protocol: urlObj.protocol.replace(':', ''),
    hostname: urlObj.hostname,
    port: urlObj.port || '',
    pathname: '**',
  };
  
  // Use a string key to identify unique patterns
  const key = `${pattern.protocol}-${pattern.hostname}-${pattern.port}`;
  patternsMap.set(key, pattern);
});

// Convert map values to array
const remotePatterns = [...patternsMap.values()];

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    }, 
  }, 
}

export default nextConfig;