import './UploadCircle.scss';
import arrow from '../../img/arrow.svg';
import Typography from '../../components/Typography';
import { useState } from 'react';
import clsx from 'clsx';

interface UploadCircleProps {
  onFilesSelected?: (files: FileList) => void;
}

const UploadCircle = ({ onFilesSelected }: UploadCircleProps) => {
  const [dragIn, setDragIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected?.(e.target.files);
      e.target.form?.reset();
    }
  };

  const handleDragEnter = () => {
    setDragIn(true);
  };

  const handleDragExit = () => {
    setDragIn(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragIn(false);
    if (e.dataTransfer.items.length > 0) {
      onFilesSelected?.(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const text = dragIn ? 'Drop to begin uploading' : 'Drag your files here';

  const circleClasses = clsx(
    'uploadCircle rounded-full bg-gray-200 flex justify-center items-center',
    [dragIn && 'pulse']
  );
  const arrowClasses = clsx('mx-auto', [dragIn && 'animate-bounce']);

  return (
    <form>
      <input
        onChange={handleChange}
        id="fileInput"
        type="file"
        multiple
        className="fileInput"
      />
      <label
        role="button"
        htmlFor="fileInput"
        className={circleClasses}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragExit}
        onDragOver={handleDragOver}
      >
        <div className="pointer-events-none">
          <img src={arrow} alt="" className={arrowClasses} />
          <Typography className="text-center" variant="h5" component="p">
            {text}
            <br />
            <Typography className="text-gray-400">
              or click to select a file
            </Typography>
          </Typography>
        </div>
      </label>
    </form>
  );
};

export default UploadCircle;
