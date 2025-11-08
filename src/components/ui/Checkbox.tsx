import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  id,
  className = '',
  ...props 
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          id={id}
          className={`
            peer
            w-5 h-5 bg-input border-2 border-input rounded
            focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
            cursor-pointer transition-all duration-200
            appearance-none
            checked:bg-primary checked:border-primary
            hover:border-primary/70
            ${className}
          `}
          {...props}
        />
        {/* Checkmark icon */}
        <svg 
          className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path 
            d="M10 3L4.5 8.5L2 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <label
        htmlFor={id}
        className="text-body text-gray-300 cursor-pointer select-none leading-6"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;