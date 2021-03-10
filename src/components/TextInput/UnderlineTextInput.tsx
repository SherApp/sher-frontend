import { useState } from 'react';
import clsx from 'clsx';
import Typography from '../Typography';
import { TextInputBaseProps } from './types';

const UnderlineTextInput = ({
  fullWidth,
  className,
  endAdornment,
  label,
  ...rest
}: TextInputBaseProps) => {
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
    'py-1 tracking-widest outline-none bg-transparent'
  );

  const containerClasses = clsx(
    isFocused ? 'border-pink' : 'dark:border-gray-600',
    'px-2 flex border-b-2  transition-colors',
    className
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

export default UnderlineTextInput;
