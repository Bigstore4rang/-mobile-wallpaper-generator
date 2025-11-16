import React, { useState } from 'react';
import { XMarkIcon } from './icons';
import { Loader } from './Loader';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => Promise<void>;
  onDelete: () => void;
  onClose: () => void;
  hasExistingKey: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onDelete, onClose, hasExistingKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsTesting(true);
    setError(null);
    try {
      await onSave(inputValue);
      setInputValue('');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsTesting(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    setInputValue('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full mx-4 text-center transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="닫기"
        >
          <XMarkIcon />
        </button>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          API 키 설정
        </h2>
        <p className="mb-4 text-gray-300">
          Gemini API 키를 입력해주세요. 키는 당신의 브라우저에 안전하게 저장됩니다.
        </p>
        {hasExistingKey && (
          <p className="mb-4 text-sm text-yellow-400/80 bg-yellow-900/20 rounded-md p-2">
            저장된 API 키가 있습니다. 새 키를 입력하면 덮어씁니다.
          </p>
        )}
        <div className="relative mb-4">
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AIzaSy... 키를 여기에 붙여넣으세요"
            className="w-full p-3 pr-4 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-white placeholder-gray-500"
            disabled={isTesting}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isTesting && inputValue.trim()) handleSave(); }}
          />
        </div>

        {error && (
          <p className="mb-4 text-red-400">{error}</p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDelete}
            disabled={!hasExistingKey || isTesting}
            className="w-full sm:w-auto flex-1 px-4 py-3 text-md font-semibold text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            키 삭제
          </button>
          <button
            onClick={handleSave}
            disabled={isTesting || !inputValue.trim()}
            className="w-full sm:w-auto flex-1 px-4 py-3 text-md font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isTesting && <Loader />}
            저장 및 테스트
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          API 키 사용에 대한 요금이 부과될 수 있습니다. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400">자세히 알아보기</a>
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes scaleIn {
          from { 
            transform: scale(0.95);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
