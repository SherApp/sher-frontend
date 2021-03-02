import clipboardIcon from '../../img/clipboard.svg';
import { useRef } from 'react';

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
      <button
        onClick={handleCopyClick}
        className="bg-gradient-r-purple-pink p-1"
        aria-label="copy to clipboard"
      >
        <img src={clipboardIcon} alt="" />
      </button>
    </div>
  );
};

export default UploadLink;
