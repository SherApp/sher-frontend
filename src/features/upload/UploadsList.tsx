import { Upload } from 'sher-shared/upload';
import UploadItem from './UploadItem';
import Typography from '../../components/Typography';
import UploadLink from './UploadLink';
import uploadingIcon from '../../img/uploading.svg';
import tickIcon from '../../img/tick.svg';
import errorIcon from '../../img/error.svg';
import { getUploadLink } from '../../sharedUtils/getUploadLink';

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
        <UploadItem
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
          actions={<UploadLink link={getUploadLink(u.id, u.name)} />}
        />
      ))}
    </div>
  );
};

export default UploadsList;
