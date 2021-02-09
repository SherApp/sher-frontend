import clsx from 'clsx';
import { useState } from 'react';
import Typography from './Typography';

interface TextInputProps extends React.HTMLProps<HTMLDivElement> {
  fullWidth?: boolean;
  endAdornment?: JSX.Element;
  label?: string;
  InputProps?: React.HTMLProps<HTMLInputElement>;
}

const TextInput = ({
  fullWidth,
  className,
  endAdornment,
  label,
  InputProps,
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
    'py-1 tracking-widest outline-none',
    className
  );

  const containerClasses = clsx(
    {
      'border-pink': isFocused
    },
    'px-2 flex border-b-2 transition-colors'
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
          {...InputProps}
        />
      </label>
      {endAdornment}
    </div>
  );
};

export default TextInput;
