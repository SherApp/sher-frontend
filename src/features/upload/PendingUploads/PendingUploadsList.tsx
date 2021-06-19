import { Upload } from '@sherapp/sher-shared/upload';
import ProgressRing from '../../../components/ProgressRing';
import Typography from '../../../components/Typography';
import fileSize from 'filesize';
import IconButton from '../../../components/IconButton';
import { X } from 'react-feather';

interface Props {
  uploads?: Upload[];
}

const PendingUploadsList = ({ uploads }: Props) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <ul>
        {uploads?.map((u) => (
          <li className="flex justify-between items-center px-4" key={u.id}>
            <div className="flex items-center flex-grow">
              <ProgressRing value={u.progress} />
              <div className="py-2 ml-2 border-gray-300 border-b flex-grow flex items-center justify-between">
                <div>
                  <Typography component="p">{u.name}</Typography>
                  <Typography
                    component="p"
                    variant="sm"
                    className="text-gray-400"
                  >
                    {fileSize(u.size)}
                  </Typography>
                </div>
                <div>
                  <IconButton>
                    <X />
                  </IconButton>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingUploadsList;
