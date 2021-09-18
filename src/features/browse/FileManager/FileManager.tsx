import CreateFolderDialog from './CreateFolderDialog';
import DirectoryPath from './DirectoryPath';
import Button from '../../../components/Button';
import { FolderPlus } from 'react-feather';
import DirectoryContentsTable from './DirectoryContentsTable';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useDirectory from '../useDirectory';

interface Props {
  className?: string;
}

const FileManager = ({ className }: Props) => {
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);

  const { query } = useRouter();

  const { directory, createChildDirectory } = useDirectory(
    (query?.id as string) ?? undefined
  );

  const handleCreateFolderClick = () => {
    setShowCreateFolderDialog(true);
  };

  const handleCreateFolder = async (name?: string) => {
    if (!name) return;

    setShowCreateFolderDialog(false);
    await createChildDirectory(name);
  };

  if (!directory) return null;

  const files = directory?.files;
  const directories = directory?.directories;

  return (
    <div className={className}>
      <CreateFolderDialog
        onOkClick={handleCreateFolder}
        onClose={() => setShowCreateFolderDialog(false)}
        show={showCreateFolderDialog}
      />
      <DirectoryPath path={directory?.path} />
      <div className="mb-2">
        <Button onClick={handleCreateFolderClick} icon={<FolderPlus />}>
          Create folder
        </Button>
      </div>
      <DirectoryContentsTable files={files} directories={directories} />
    </div>
  );
};

export default FileManager;
