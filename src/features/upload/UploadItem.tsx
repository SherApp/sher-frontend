import tickIcon from '../../img/tick.svg';
import Typography, { TypographyProps } from '../../components/Typography';
import fileSize from 'filesize';
import ProgressBar from '../../components/ProgressBar';

type UploadStatus = 'pending' | 'success' | 'failure';

interface UploadItemProps {
  status: UploadStatus;
  name: string;
  size: number;
  progress?: number;
  link: string;
}

const icons = {
  pending: tickIcon,
  success: tickIcon,
  failure: tickIcon
};

const srTexts = {
  pending: 'uploading...',
  success: 'uploaded successfully',
  failure: 'uploading failed'
};

const Text = (props: TypographyProps) => (
  <Typography
    component="p"
    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
    {...props}
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
    <div className="grid grid-cols-1 grid-cols-4 gap-4 border-b-2 py-5 text-center transition-colors hover:bg-gray-100 items-center">
      <div className="flex ml-4">
        <Typography variant="srOnly">{srTexts[status]}</Typography>
        <img className="mr-7" alt="" src={icons[status]} />
        <Text>{name}</Text>
      </div>
      <Text>{fileSize(size)}</Text>
      <ProgressBar progress={progress} fullWidth />
      <Text>{link}</Text>
    </div>
  );
};

export default UploadItem;
