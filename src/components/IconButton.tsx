import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  gradient?: boolean;
}

const IconButton = ({ gradient, className, ...rest }: Props) => {
  const classes = clsx(
    'p-1 rounded-lg transition-colors',
    gradient
      ? 'bg-gradient-r-purple-pink text-white'
      : 'bg-gray-800 bg-opacity-0 hover:bg-opacity-10 dark:bg-gray-200',
    className
  );
  return <button className={classes} {...rest} />;
};

export default IconButton;
