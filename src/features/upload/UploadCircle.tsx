import './UploadCircle.scss';
import arrow from '../../img/arrow.svg';
import Typography from '../../components/Typography';
import clsx from 'clsx';
import FileDragArea from '../../components/FileDragArea';

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

  return (
    <form>
      <input
        onChange={handleChange}
        id="fileInput"
        type="file"
        multiple
        className="fileInput"
      />
      <FileDragArea
        onFilesSelected={onFilesSelected}
        as="label"
        role="button"
        htmlFor="fileInput"
      >
        {(dragIn) => {
          const text = dragIn
            ? 'Drop to begin uploading'
            : 'Drag your files here';

          const circleClasses = clsx(
            'uploadCircle rounded-full bg-gray-200 dark:bg-gray-800 flex justify-center items-center',
            [dragIn && 'pulse']
          );
          const arrowClasses = clsx('mx-auto', [dragIn && 'animate-bounce']);

          return (
            <div className={circleClasses}>
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
            </div>
          );
        }}
      </FileDragArea>
    </form>
  );
};

export default UploadCircle;
