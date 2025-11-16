
import React from 'react';

interface ImageGridProps {
  images: string[];
  onImageClick: (image: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-3 md:gap-4 animate-fade-in">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden cursor-pointer group relative shadow-lg"
          onClick={() => onImageClick(image)}
        >
          <img
            src={image}
            alt={`Generated wallpaper ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
             <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">전체 화면</p>
          </div>
        </div>
      ))}
    </div>
  );
};
