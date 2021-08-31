import { Upload } from '@sherapp/sher-shared/upload';
import { FileUploadItem } from '../browse/UploadItem';
import UploadStatusIcon from './UploadStatusIcon';
import config from '../../utils/config';

interface UploadsListProps {
  uploads: Upload[];
}

const UploadsList = ({ uploads }: UploadsListProps) => {
  const mapUploadToComponent = (u: Upload, index: number) => {
    let id;
    if (u.url) {
      id = u.url.split('/').pop();
    }

    return (
      <FileUploadItem
        key={index}
        icon={<UploadStatusIcon status={u.status} />}
        name={u.name}
        size={u.size}
        progress={u.progress}
        url={`${config.api.absoluteUrl}${u.url}`}
        id={id}
      />
    );
  };
  return (
    <div className="flex flex-col my-8 container">
      {uploads.map(mapUploadToComponent)}
    </div>
  );
};

export default UploadsList;
