import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`p-4 md:p-6 h-full w-full flex flex-col ${className}`}>
      {children}
    </div>
  );
}
