import Typography from '../../components/Typography';
import clipboardIcon from '../../img/clipboard.svg';

interface UploadLinkProps {
  link?: string;
}

const UploadLink = ({ link }: UploadLinkProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden">
      <div className="flex-grow w-0 bg-gray-200 whitespace-nowrap flex items-center scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray-300">
        <Typography className="px-2 py-1" component="p">
          {link}
        </Typography>
      </div>
      <button
        className="bg-gradient-r-purple-pink p-1"
        aria-label="copy to clipboard"
      >
        <img src={clipboardIcon} alt="" />
      </button>
    </div>
  );
};

export default UploadLink;
