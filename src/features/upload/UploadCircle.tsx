import './UploadCircle.scss';
import arrow from '../../img/arrow.svg';
import Typography from '../../components/Typography';

interface UploadCircleProps {
  onFilesSelected?: (files: FileList) => void;
}

const UploadCircle = ({ onFilesSelected }: UploadCircleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected?.(e.target.files);
      e.target.form?.reset();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (e.dataTransfer.files.length >= 0) {
      onFilesSelected?.(e.dataTransfer.files);
    }
  };

  return (
    <form>
      <label
        role="button"
        htmlFor="fileInput"
        className="uploadCircle rounded-full bg-gray-200 w-10 flex justify-center flex-col items-center space-y-12 cursor-pointer"
        onDrop={handleDrop}
      >
        <img className="max-h-full" src={arrow} alt="" />
        <Typography className="text-center" variant="h5" component="p">
          Drag your files here
          <br />
          <Typography className="text-gray-400">
            or click to select a file
          </Typography>
        </Typography>
      </label>
      <input
        onChange={handleChange}
        id="fileInput"
        type="file"
        multiple
        className="hidden"
      />
    </form>
  );
};

export default UploadCircle;
