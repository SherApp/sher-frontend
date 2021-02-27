import tickIcon from '../../img/tick.svg';
import uploadingIcon from '../../img/uploading.svg';
import errorIcon from '../../img/error.svg';
import Typography, { TypographyProps } from '../../components/Typography';
import fileSize from 'filesize';
import ProgressBar from '../../components/ProgressBar';
import UploadLink from './UploadLink';
import clsx from 'clsx';

type UploadStatus = 'pending' | 'success' | 'failure';

interface UploadItemProps {
  status: UploadStatus;
  name: string;
  size: number;
  progress?: number;
  link: string;
}

const icons = {
  pending: uploadingIcon,
  success: tickIcon,
  failure: errorIcon
};

const srTexts = {
  pending: 'uploading...',
  success: 'uploaded successfully',
  failure: 'uploading failed'
};

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
  status,
  name,
  size,
  progress = 0,
  link
}: UploadItemProps) => {
  return (
    <div className="animate-slideInTop grid grid-cols-1 grid-cols-4 lg:gap-8 md:gap-4 border-b-2 dark:border-gray-800 py-5 px-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 items-center">
      <div className="flex">
        <Typography variant="srOnly">{srTexts[status]}</Typography>
        <img className="mr-7" alt="" src={icons[status]} />
        <Text>{name}</Text>
      </div>
      <Text className="text-center">{fileSize(size)}</Text>
      <ProgressBar progress={progress} fullWidth />
      <UploadLink link={link} />
    </div>
  );
};

export default UploadItem;
