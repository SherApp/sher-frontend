import clsx from 'clsx';
import Typography from './Typography';

interface ProgressBarProps {
  progress: number;
  fullWidth?: boolean;
  className?: string;
}

const ProgressBar = ({ progress, fullWidth, className }: ProgressBarProps) => {
  const classes = clsx('rounded-full overflow-hidden bg-gray-300', className, [
    fullWidth && 'w-full'
  ]);
  return (
    <div className={classes}>
      <div
        className="bg-gradient-r-purple-pink h-full text-center transition-all"
        style={{ width: `${progress}%` }}
      >
        <Typography className="text-white py-1 block">{progress}%</Typography>
      </div>
    </div>
  );
};

export default ProgressBar;
