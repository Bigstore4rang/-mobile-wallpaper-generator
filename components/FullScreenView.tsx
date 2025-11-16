
import React from 'react';
import { XMarkIcon, DownloadIcon, SparklesIcon } from './icons';

interface FullScreenViewProps {
  image: string;
  onClose: () => void;
  onDownload: () => void;
  onRemix: () => void;
}

export const FullScreenView: React.FC<FullScreenViewProps> = ({ image, onClose, onDownload, onRemix }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="relative w-full h-full max-w-md p-4 flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors z-10"
          aria-label="닫기"
        >
          <XMarkIcon />
        </button>
        <div className="w-full aspect-[9/16] rounded-lg overflow-hidden shadow-2xl">
          <img src={image} alt="Selected wallpaper" className="w-full h-full object-contain" />
        </div>
        <div className="mt-4 flex w-full justify-center gap-4">
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
          >
            <DownloadIcon />
            다운로드
          </button>
          <button
            onClick={onRemix}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
          >
            <SparklesIcon />
            Remix
          </button>
        </div>
      </div>
    </div>
  );
};
