import clsx from 'clsx';
import { useState } from 'react';
import Typography from './Typography';

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
  fullWidth?: boolean;
  endAdornment?: JSX.Element;
  label?: string;
}

const TextInput = ({
  fullWidth,
  className,
  endAdornment,
  label,
  ...rest
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelClasses = clsx({
    'w-full': fullWidth
  });

  const inputClasses = clsx(
    {
      'w-full': fullWidth
    },
    'py-1 tracking-widest outline-none bg-transparent',
    className
  );

  const containerClasses = clsx(
    isFocused ? 'border-pink' : 'dark:border-gray-600',
    'px-2 flex border-b-2  transition-colors'
  );

  return (
    <div className={containerClasses} {...rest}>
      <label className={labelClasses}>
        <Typography
          variant="caption"
          component="span"
          className="text-gradient bg-gradient-r-purple-pink font-serif text-sm"
        >
          {label}
        </Typography>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          {...rest}
        />
      </label>
      {endAdornment}
    </div>
  );
};

export default TextInput;
