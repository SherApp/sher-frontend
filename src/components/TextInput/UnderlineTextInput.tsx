import { useState } from 'react';
import clsx from 'clsx';
import Typography from '../Typography';
import { TextInputBaseProps } from './types';

const UnderlineTextInput = ({
  className,
  endAdornment,
  label,
  error,
  hint,
  ...rest
}: TextInputBaseProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelClasses = clsx('w-full');

  const inputClasses = clsx(
    'w-full py-1 tracking-widest outline-none bg-transparent'
  );

  const containerClasses = clsx(
    isFocused ? 'border-pink' : 'dark:border-gray-600',
    'flex border-b-2  transition-colors',
    className
  );

  const hintClasses = clsx([error && 'text-red-500']);

  return (
    <div className="px-2">
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
      <small className={hintClasses}>{error ?? hint}</small>
    </div>
  );
};

export default UnderlineTextInput;
