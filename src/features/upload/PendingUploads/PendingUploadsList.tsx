import ProgressRing from '../../../components/ProgressRing';
import Typography from '../../../components/Typography';
import fileSize from 'filesize';
import IconButton from '../../../components/IconButton';
import { X } from 'react-feather';
import UploadStatusIcon from '../UploadStatusIcon';
import { Upload } from '@sherapp/sher-shared';

interface Props {
  uploads?: Upload[];
  onUploadCancelClick?(uploadId: string): void;
}

const PendingUploadsList = ({ uploads, onUploadCancelClick }: Props) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <ul>
        {uploads?.map((u) => (
          <li className="flex justify-between items-center px-4" key={u.key}>
            <div className="flex items-center flex-grow">
              <div className="w-8 flex justify-center">
                {u.status !== 'uploading' ? (
                  <UploadStatusIcon status={u.status} />
                ) : (
                  <ProgressRing value={u.progress} />
                )}
              </div>
              <div className="ml-2 py-2 dark:border-gray-800 border-gray-300 border-b flex-grow flex items-center justify-between">
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
                {u.status === 'uploading' && (
                  <div>
                    <IconButton onClick={() => onUploadCancelClick?.(u.key)}>
                      <X />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingUploadsList;
