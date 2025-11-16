
import React, { useState, useCallback } from 'react';
import { generateWallpapers } from './services/geminiService';
import { ImageGrid } from './components/ImageGrid';
import { FullScreenView } from './components/FullScreenView';
import { Loader } from './components/Loader';
import { SparklesIcon, XMarkIcon } from './components/icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGenerate = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateWallpapers(prompt);
      setImages(generatedImages);
    } catch (e) {
      setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseFullScreen = () => {
    setSelectedImage(null);
  };
  
  const handleDownload = () => {
    if (!selectedImage) return;
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `ai-wallpaper-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemix = () => {
     setSelectedImage(null);
     // The prompt is already in the state, so the user can edit it right away.
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <header className="p-4 border-b border-gray-700 shadow-lg bg-gray-800/50 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          AI 배경화면 생성기
        </h1>
      </header>

      <main className="flex-grow p-4 md:p-6 flex flex-col items-center w-full max-w-4xl mx-auto">
        <form onSubmit={handleGenerate} className="w-full mb-6">
          <label htmlFor="prompt" className="block text-lg font-medium mb-2 text-gray-300">
            어떤 분위기의 배경화면을 원하시나요?
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 비 오는 서정적인 도시 풍경, 네온사인, 8k"
              className="w-full h-24 p-4 pr-12 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none text-white placeholder-gray-500"
              disabled={isLoading}
            />
          </div>
           <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader />
                생성 중...
              </>
            ) : (
              <>
                <SparklesIcon />
                배경화면 생성
              </>
            )}
          </button>
        </form>

        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative w-full text-center" role="alert">
                <strong className="font-bold">오류: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {images.length > 0 && !isLoading && (
          <ImageGrid images={images} onImageClick={handleImageClick} />
        )}
        
        {!isLoading && images.length === 0 && !error && (
          <div className="text-center text-gray-500 flex-grow flex flex-col justify-center">
            <p>원하는 스타일을 설명하고 버튼을 눌러보세요.</p>
            <p className="text-sm">4개의 고유한 배경화면이 생성됩니다.</p>
          </div>
        )}

      </main>

      {selectedImage && (
        <FullScreenView
          image={selectedImage}
          onClose={handleCloseFullScreen}
          onDownload={handleDownload}
          onRemix={handleRemix}
        />
      )}
    </div>
  );
};

export default App;
