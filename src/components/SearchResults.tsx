import React from 'react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectResult }) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Related Documentation:</h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div 
            key={index}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => onSelectResult(result)}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-600">{result.title}</h4>
              <span className="text-xs px-2 py-1 bg-gray-200 rounded-full capitalize">
                {result.platform}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {result.content.substring(0, 150)}...
            </p>
            <div className="text-xs text-gray-500 mt-1">
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                View documentation
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;