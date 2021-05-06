import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  gradient?: boolean;
}

const IconButton = ({ gradient, className, ...rest }: Props) => {
  const classes = clsx(
    'p-1 rounded-lg transition-colors',
    gradient
      ? 'bg-gradient-r-purple-pink text-white'
      : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700',
    className
  );
  return <button className={classes} {...rest} />;
};

export default IconButton;
