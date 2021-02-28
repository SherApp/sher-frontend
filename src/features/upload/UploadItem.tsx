import Typography, { TypographyProps } from '../../components/Typography';
import fileSize from 'filesize';
import ProgressBar from '../../components/ProgressBar';
import clsx from 'clsx';

interface UploadItemProps {
  icon?: JSX.Element;
  name: string;
  size: number;
  progress?: number;
  actions?: JSX.Element;
}

const Text = ({ className, ...rest }: TypographyProps) => (
  <Typography
    component="p"
    className={clsx(
      'overflow-hidden overflow-ellipsis whitespace-nowrap',
      className
    )}
    {...rest}
  />
);

const UploadItem = ({
  icon,
  name,
  size,
  progress,
  actions
}: UploadItemProps) => {
  const containerClasses = clsx(
    'animate-slideInTop grid',
    progress !== undefined ? 'grid-cols-4' : 'grid-cols-3',
    'lg:gap-8 md:gap-4 border-b-2 dark:border-gray-800 py-5 px-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 items-center'
  );

  return (
    <div className={containerClasses}>
      <div className="flex">
        <div className="w-8 mr-7">{icon}</div>
        <Text>{name}</Text>
      </div>
      <Text className="text-center">{fileSize(size)}</Text>
      {progress !== undefined && <ProgressBar progress={progress} fullWidth />}
      {actions}
    </div>
  );
};

export default UploadItem;
