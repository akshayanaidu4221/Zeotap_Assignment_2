import React from 'react';
import { Platform } from '../types';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  onSelectPlatform 
}) => {
  const platforms: { value: Platform; label: string }[] = [
    { value: 'all', label: 'All Platforms' },
    { value: 'segment', label: 'Segment' },
    { value: 'mparticle', label: 'mParticle' },
    { value: 'lytics', label: 'Lytics' },
    { value: 'zeotap', label: 'Zeotap' }
  ];

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm font-medium text-gray-700">Filter by platform:</span>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.value}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedPlatform === platform.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onSelectPlatform(platform.value)}
          >
            {platform.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;