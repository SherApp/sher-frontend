import { useRef } from 'react';
import { Clipboard } from 'react-feather';
import IconButton from '../../components/IconButton';

interface UploadLinkProps {
  link?: string;
}

const UploadLink = ({ link }: UploadLinkProps) => {
  const linkRef = useRef<HTMLInputElement>(null);

  const handleCopyClick = () => {
    linkRef.current?.select();
    document.execCommand('copy');
  };

  return (
    <div className="flex flex-grow rounded-lg overflow-hidden">
      <input
        ref={linkRef}
        className="flex-1 bg-gray-200 dark:bg-gray-800 px-2 py-1 w-0 outline-none"
        readOnly
        value={link}
      />
      <IconButton
        gradient
        onClick={handleCopyClick}
        className="bg-gradient-r-purple-pink p-1 rounded-r rounded-l-none"
        aria-label="copy to clipboard"
      >
        <Clipboard />
      </IconButton>
    </div>
  );
};

export default UploadLink;
