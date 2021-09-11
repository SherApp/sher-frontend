import Image from 'next/image';

interface Props {
  thumbnailUrl?: string;
  icon?: JSX.Element;
}

const ThumbHeader = ({ thumbnailUrl }: Pick<Props, 'thumbnailUrl'>) => {
  return (
    <div>
      <Image src={thumbnailUrl} alt="file thumbnail" />
    </div>
  );
};

const IconHeader = ({ icon }: Pick<Props, 'icon'>) => {
  return <div className="flex items-center justify-center">{icon}</div>;
};

const ItemInfoHeader = ({ thumbnailUrl, icon }: Props) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-600">
      {thumbnailUrl && <ThumbHeader thumbnailUrl={thumbnailUrl} />}
      {icon && !thumbnailUrl && <IconHeader icon={icon} />}
    </div>
  );
};

export default ItemInfoHeader;
