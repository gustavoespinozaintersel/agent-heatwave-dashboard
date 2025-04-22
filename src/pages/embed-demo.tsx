
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

// This is a helper page to demonstrate embedding the heatmap with URL parameters
const EmbedDemo = () => {
  const [searchParams] = useSearchParams();
  
  // Extract parameters for demo purposes
  const params = Object.fromEntries([...searchParams.entries()]);
  const hasParams = Object.keys(params).length > 0;
  
  // If no params, redirect to main dashboard
  if (!hasParams) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Embed Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates how the heatmap can be embedded with URL parameters.
        </p>
      </div>
      
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold mb-4">Received Parameters:</h2>
        <div className="space-y-2">
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div className="font-medium text-gray-700">{key}:</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            In a real implementation, these parameters would be used to configure and load the heatmap.
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <a 
          href="/" 
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default EmbedDemo;
