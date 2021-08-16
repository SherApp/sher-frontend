import UploadCircle from './UploadCircle';
import UploadsList from './UploadsList';
import useFilesUpload from './useFilesUpload';
import useDirectory from '../browse/useDirectory';

const UploadRoute = () => {
  const { directory } = useDirectory();
  const { uploads = [], uploadFiles } = useFilesUpload();

  const handleFilesSelected = (files: FileList) => {
    if (!directory) {
      return;
    }

    uploadFiles(files, directory?.id);
  };

  return (
    <>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      <UploadsList uploads={uploads} />
    </>
  );
};

export default UploadRoute;
