import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  text = "Loading..." 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-body-sm",
    md: "text-body",
    lg: "text-body-lg"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      {/* Spinner */}
      <div 
        className={`
          ${sizeClasses[size]} 
          border-4 
          border-input 
          border-t-primary 
          rounded-full 
          animate-spin
        `}
      />
      
      {/* Loading Text */}
      {text && (
        <p className={`${textSizes[size]} text-white font-regular`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;