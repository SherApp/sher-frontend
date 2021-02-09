import React from 'react';
import clsx from 'clsx';
import Typography from './Typography';

const Button = ({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = clsx('bg-gradient-r-purple-pink rounded py-2 text-white shadow-button',
    className
  );

  return (<Typography component="button" variant="caption" type="button" className={classes} {...rest}>
    {children}
  </Typography>)
};

export default Button;
