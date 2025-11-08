import React, { useState } from 'react';
import DownloadIcon from "../../assets/icons/download.png";

interface FileUploadProps {
  value?: File | null;
  preview?: string;
  onChange: (file: File | null, preview: string) => void;
  className?: string;
  mobileClassName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  preview,
  onChange,
  className = "",
  mobileClassName = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const baseClasses = `
    relative flex flex-col items-center justify-center
    border-2 border-dashed rounded-xl
    cursor-pointer transition-all duration-300
    ${isDragging 
      ? 'border-primary bg-primary/10' 
      : 'border-white/30 bg-input/20 hover:border-primary/50'
    }
  `;

  return (
    <>
      {/* Mobile Layout */}
      <div className={`md:hidden ${mobileClassName}`}>
        <label
          htmlFor="image-upload-mobile"
          className={`${baseClasses} w-full h-full min-h-[272px]`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <img 
                src={DownloadIcon} 
                alt="Download" 
                className="w-6 h-6 mb-3 opacity-70" 
              />
              <p className="text-sm text-white/70 font-normal">
                Drop an image here
              </p>
            </div>
          )}
          <input
            id="image-upload-mobile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Desktop Layout */}
      <div className={`hidden md:block ${className}`}>
        <label
          htmlFor="image-upload"
          className={`${baseClasses} w-full h-96`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <img 
                src={DownloadIcon} 
                alt="Download" 
                className="w-6 h-6 mb-3 opacity-70" 
              />
              <p className="text-base text-white/70 font-normal">
                Drop an image here
              </p>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;