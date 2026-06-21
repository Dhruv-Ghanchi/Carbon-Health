import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TooltipCardProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function TooltipCard({ content, children, className }: TooltipCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />}
      
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-700 bg-white border border-gray-100 rounded-xl shadow-soft bottom-full left-1/2 -translate-x-1/2 mb-2">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white" />
        </div>
      )}
    </div>
  );
}
