import { useUploadsInfo } from '../UploadsInfoContext';
import PendingUploadsHeader from './PendingUploadsHeader';
import PendingUploadsList from './PendingUploadsList';

const PendingUploads = () => {
  const { uploads } = useUploadsInfo();

  return (
    <div className="fixed right-6 bottom-0">
      <div className="w-80 shadow">
        <PendingUploadsHeader isOpen />
        <PendingUploadsList uploads={uploads} />
      </div>
    </div>
  );
};

export default PendingUploads;
