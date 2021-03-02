import clsx from 'clsx';

const IconButton = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const classes = clsx('p-1 bg-gradient-r-purple-pink rounded-lg', className);
  return <button className={classes} {...rest} />;
};

export default IconButton;
