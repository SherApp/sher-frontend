import { FileKind } from '@sherapp/sher-shared';
import ItemInfoHeader from './ItemInfoHeader';
import { FileText, Film, Folder, Image, Music, File } from 'react-feather';

interface Props {
  name: string;
  thumbnailUrl?: string;
  length?: number;
  fileKind?: FileKind;
  directory?: boolean;
  className?: string;
}

type FileKindIconMap = {
  [kind in FileKind]: JSX.Element;
};

const icons: FileKindIconMap = {
  [FileKind.Image]: <Image />,
  [FileKind.Document]: <FileText />,
  [FileKind.Audio]: <Music />,
  [FileKind.Video]: <Film />,
  [FileKind.Unknown]: <File />
};

const getItemIcon = (directory?: boolean, fileKind?: FileKind) => {
  if (directory) {
    return <Folder />;
  }

  return fileKind ? icons[fileKind] : icons[FileKind.Unknown];
};

const ItemInfo = ({
  name,
  thumbnailUrl,
  fileKind,
  directory,
  className
}: Props) => {
  return (
    <div className={className}>
      <ItemInfoHeader
        thumbnailUrl={thumbnailUrl}
        icon={getItemIcon(directory, fileKind)}
      />
    </div>
  );
};

export default ItemInfo;
