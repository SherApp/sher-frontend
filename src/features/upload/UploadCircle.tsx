import './UploadCircle.scss';
import arrow from '../../img/arrow.svg';
import Typography from '../../components/Typography';

const UploadCircle = () => {
  return (
    <div className="uploadCircle rounded-full bg-gray-200 w-10 flex justify-center flex-col items-center space-y-12">
      <img className="max-h-full" src={arrow} alt="" />
      <Typography className="text-center" variant="h5" component="p">
        Drag your files here
        <br />
        <Typography className="text-gray-400">
          or click to select a file
        </Typography>
      </Typography>
    </div>
  );
};

export default UploadCircle;
