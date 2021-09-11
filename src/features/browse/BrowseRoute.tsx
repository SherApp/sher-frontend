import useDirectory from './useDirectory';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { FolderPlus } from 'react-feather';
import CreateFolderDialog from './CreateFolderDialog';
import {
  FileDragAreaInfo,
  FileDragAreaContextProvider
} from '../../components/FileDragArea';
import PendingUploads from '../upload/PendingUploads';
import { useRouter } from 'next/router';
import PathBreadcrumbs from './PathBreadcrumbs';
import DirectoryContentsTable from './DirectoryContentsTable';
import Bookmarks from './Bookmarks';
import ItemInfo from './ItemInfo';

const BrowseRoute = () => {
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
    <FileDragAreaContextProvider>
      <PendingUploads />
      <FileDragAreaInfo />
      <div className="px-8 flex">
        <Bookmarks className="w-60" />
        <div className="flex-grow">
          <CreateFolderDialog
            onOkClick={handleCreateFolder}
            onClose={() => setShowCreateFolderDialog(false)}
            show={showCreateFolderDialog}
          />
          <PathBreadcrumbs path={directory?.path} />
          <div className="mb-2">
            <Button onClick={handleCreateFolderClick} icon={<FolderPlus />}>
              Create folder
            </Button>
          </div>
          <DirectoryContentsTable data={[...files, ...directories]} />
        </div>
        <ItemInfo className="w-60" name="ok" />
      </div>
    </FileDragAreaContextProvider>
  );
};

export default BrowseRoute;
