import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-body-sm text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full bg-input  text-white text-body rounded-[10px]
            ${icon ? 'pl-10 pr-4' : 'px-4'} py-3 
            rounded-lg border border-input/50 
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
            transition placeholder:text-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-body-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Input;