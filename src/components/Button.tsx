import React from 'react';
import clsx from 'clsx';
import Typography from './Typography';

type Variant = 'primary' | 'gradient' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: JSX.Element;
  fullWidth?: boolean;
}

const Button = ({
  className,
  children,
  fullWidth,
  variant = 'primary',
  icon,
  ...rest
}: ButtonProps) => {
  const classes = clsx(
    [
      variant === 'gradient' &&
        'bg-gradient-r-purple-pink shadow-button text-white'
    ],
    [variant === 'secondary' && 'text-pink border-pink border'],
    [
      variant === 'primary' &&
        'transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'
    ],
    [fullWidth && 'w-full'],
    'rounded py-2 flex justify-center',
    variant === 'gradient' ? 'px-10' : 'px-4',
    className
  );

  return (
    <Typography
      component="button"
      variant="caption"
      type="button"
      className={classes}
      {...rest}
    >
      <div className="flex">
        {icon && <div className="mr-4">{icon}</div>}
        {children}
      </div>
    </Typography>
  );
};

export default Button;
