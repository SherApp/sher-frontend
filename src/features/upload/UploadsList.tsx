import { Upload } from '@sherapp/sher-shared/upload';
import uploadingIcon from '../../img/uploading.svg';
import tickIcon from '../../img/tick.svg';
import errorIcon from '../../img/error.svg';
import { FileUploadItem } from './UploadItem';
import Typography from '../../components/Typography';

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

interface UploadsListProps {
  uploads: Upload[];
}

const UploadsList = ({ uploads }: UploadsListProps) => {
  const getUploadStatus = (upload: Upload) => {
    if (upload.error) {
      return 'failure';
    } else if (!upload.success) {
      return 'pending';
    }
    return 'success';
  };

  return (
    <div className="flex flex-col my-8 container">
      {uploads.map((u) => (
        <FileUploadItem
          icon={
            <>
              <Typography variant="srOnly">
                {srTexts[getUploadStatus(u)]}
              </Typography>
              <img alt="" src={icons[getUploadStatus(u)]} />
            </>
          }
          name={u.name}
          size={u.size}
          progress={u.progress}
          fileId={u.id}
        />
      ))}
    </div>
  );
};

export default UploadsList;
