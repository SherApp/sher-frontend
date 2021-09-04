import useDirectory from './useDirectory';
import TextInput from '../../components/TextInput';
import NamedContainer from '../../components/NamedContainer';
import React, { useState } from 'react';
import DirectoryContentsList from './DirectoryContentsList';
import useFileSearch from './useFileSearch';
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
import Header from '../../components/Header/Header';

const BrowseRoute = () => {
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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

  const results = useFileSearch(searchQuery);

  const files = results ?? directory?.files;
  const directories = results ? [] : directory?.directories;

  if (!directory) return null;

  return (
    <FileDragAreaContextProvider>
      <PendingUploads />
      <Header />
      <NamedContainer title="Files">
        <FileDragAreaInfo />
        <CreateFolderDialog
          onOkClick={handleCreateFolder}
          onClose={() => setShowCreateFolderDialog(false)}
          show={showCreateFolderDialog}
        />
        <TextInput
          variant="contained"
          label="Search"
          className="mb-2"
          value={searchQuery}
          onChange={handleQueryChange}
        />
        <PathBreadcrumbs path={directory?.path} />
        <div className="mb-2">
          <Button onClick={handleCreateFolderClick} icon={<FolderPlus />}>
            Create folder
          </Button>
        </div>
        <DirectoryContentsList
          directoryId={directory?.id}
          files={files}
          directories={directories}
        />
      </NamedContainer>
    </FileDragAreaContextProvider>
  );
};

export default BrowseRoute;
