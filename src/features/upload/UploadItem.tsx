import tickIcon from '../../img/tick.svg';
import Typography from '../../components/Typography';
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

const UploadItem = ({
  status,
  name,
  size,
  progress = 0,
  link
}: UploadItemProps) => {
  return (
    <div className="grid grid-cols-1 grid-cols-4 gap-4">
      <div className="flex">
        <Typography variant="srOnly">{srTexts[status]}</Typography>
        <img className="mr-7" alt="" src={icons[status]} />
        <Typography>{name}</Typography>
      </div>
      <Typography>{fileSize(size)}</Typography>
      <ProgressBar progress={progress} fullWidth />
      <Typography>{link}</Typography>
    </div>
  );
};

export default UploadItem;
