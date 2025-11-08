import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './YearDropdown.css';

interface YearDropdownProps {
  value: string;
  onChange: (year: string) => void;
  className?: string;
}

const CustomInput = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }
>(({ children, onClick, className, value, ...rest }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={`bg-input h-[45px] text-sm w-full text-white border border-input/50 rounded-[10px] px-3 pr-10 appearance-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition touch-manipulation text-left relative ${className ?? ''}`}
    {...rest}
  >
    <span
      className={`whitespace-nowrap overflow-hidden text-ellipsis ${
        value ? 'text-white' : 'text-gray-400'
      }`}
    >
      {value || 'Publishing year'}
    </span>
    <svg
      className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
));
CustomInput.displayName = 'CustomInput';

const YearDropdown: React.FC<YearDropdownProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const selectedDate = value ? new Date(Number(value), 0, 1) : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(date.getFullYear().toString());
    } else {
      onChange('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showYearPicker
        dateFormat="yyyy"
        customInput={<CustomInput value={value} />}
        popperPlacement="bottom-start"
        portalId="root"
        
      />
    </div>
  );
};

export default YearDropdown;
