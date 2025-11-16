import React from 'react';
import { XMarkIcon } from './icons';

interface ApiKeyModalProps {
  error: string | null;
  onSelectKey: () => void;
  onClose: () => void;
  hasExistingKey: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ error, onSelectKey, onClose, hasExistingKey }) => {
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
        {error ? (
          <p className="mb-6 text-red-400">{error}</p>
        ) : (
          <>
            <p className="mb-4 text-gray-300">
              Gemini API 키를 선택해주세요. 키는 당신의 브라우저에 안전하게 저장됩니다.
            </p>
            {hasExistingKey && (
              <p className="mb-6 text-sm text-gray-400 bg-gray-700/50 rounded-md p-3">
                저장된 API 키가 있습니다. 새 키를 선택하여 덮어쓸 수 있습니다.
              </p>
            )}
          </>
        )}
        <button
          onClick={onSelectKey}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
        >
          API 키 선택 및 테스트
        </button>
        <p className="mt-4 text-sm text-gray-500">
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
