import { Upload } from '@sherapp/sher-shared/upload';
import { FileUploadItem } from './UploadItem';
import UploadStatusIcon from './UploadStatusIcon';

interface UploadsListProps {
  uploads: Upload[];
}

const UploadsList = ({ uploads }: UploadsListProps) => {
  return (
    <div className="flex flex-col my-8 container">
      {uploads.map((u) => (
        <FileUploadItem
          icon={<UploadStatusIcon status={u.status} />}
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
