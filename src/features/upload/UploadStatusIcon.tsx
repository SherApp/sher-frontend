import { UploadStatus } from '@sherapp/sher-shared/upload';
import Typography from '../../components/Typography';
import { Check, Upload, X } from 'react-feather';

type UploadStatusStringMap = { [key in UploadStatus]: React.ReactNode };

const srTexts: { [key in UploadStatus]: string } = {
  uploading: 'uploading...',
  success: 'uploaded successfully',
  error: 'uploading failed',
  cancelled: 'uploading cancelled'
};

const icons: UploadStatusStringMap = {
  uploading: <Upload />,
  success: <Check />,
  error: <X />,
  cancelled: <X />
};

interface Props {
  status: UploadStatus;
}

const UploadStatusIcon = ({ status }: Props) => {
  return (
    <div className="text-pink">
      <Typography variant="srOnly">{srTexts[status]}</Typography>
      {icons[status]}
    </div>
  );
};

export default UploadStatusIcon;
