import UploadCircle from './UploadCircle';
import UploadsList from './UploadsList';
import useFilesUpload from './useFilesUpload';

const UploadRoute = () => {
  const { uploads, uploadFiles } = useFilesUpload();

  const handleFilesSelected = (files: FileList) => {
    uploadFiles(files);
  };

  return (
    <>
      <UploadCircle onFilesSelected={handleFilesSelected} />
      <UploadsList uploads={uploads} />
    </>
  );
};

export default UploadRoute;
