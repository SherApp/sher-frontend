import React from 'react';
import clsx from 'clsx';
import Typography from './Typography';

type Variant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({
  className,
  children,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const classes = clsx(
    [
      variant === 'primary' &&
        'bg-gradient-r-purple-pink shadow-button text-white'
    ],
    [variant === 'secondary' && 'text-pink border-pink border'],
    'rounded py-2 px-10',
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
      {children}
    </Typography>
  );
};

export default Button;
