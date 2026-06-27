import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ESC 키 누르면 닫히기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* 팝업 창 (모달 내용) */}
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border-2 border-[var(--color-chrome-indigo)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[var(--color-platinum)] rounded-t-lg">
          <h2 className="text-xl font-bold text-[var(--color-carbon)]">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors p-1"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 text-sm md:text-base text-gray-700 bg-[var(--color-canvas)]">
          {children}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-[var(--color-platinum)] rounded-b-lg flex justify-end">
          <Button onClick={onClose}>닫기</Button>
        </div>
      </div>
    </div>
  );
}
