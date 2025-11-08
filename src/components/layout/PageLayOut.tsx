import React from 'react';
import Wavybackground from './Wavybackground';
interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showWaves?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '',
  showWaves = true 
}) => {
  return (
    <div className={`min-h-screen bg-background relative ${className}`}>
      {showWaves && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-0">
          <Wavybackground />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;