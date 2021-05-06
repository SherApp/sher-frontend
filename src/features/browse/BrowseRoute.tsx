import useDirectory from './useDirectory';
import { useLocation } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import NamedContainer from '../../components/NamedContainer';
import React, { useState } from 'react';
import DirectoryContentsList from './DirectoryContentsList';
import PathBreadcrumbs from './PathBreadcrumbs';
import useFileSearch from './useFileSearch';
import Button from '../../components/Button';
import { FolderPlus } from 'react-feather';
import CreateFolderDialog from './CreateFolderDialog';
import useFilesUpload from '../upload/useFilesUpload';
import {
  FileDragAreaInfo,
  FileDragAreaContextProvider
} from '../../components/FileDragArea';
import useDirectoryNavigation, {
  DirectoryPathSegment
} from './useDirectoryNavigation';

const BrowseRoute = () => {
  const { uploadFiles } = useFilesUpload();
  const { navigateTo, history } = useDirectoryNavigation();
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [query, setQuery] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const directoryId = new URLSearchParams(useLocation().search).get(
    'directoryId'
  );

  const { directory, createChildDirectory } = useDirectory(
    directoryId ?? undefined
  );

  const handleCreateFolderClick = () => {
    setShowCreateFolderDialog(true);
  };

  const handleCreateFolder = async (name?: string) => {
    if (!name) return;

    setShowCreateFolderDialog(false);
    await createChildDirectory(name);
  };

  const handleFilesDropped = (files: FileList, directoryId?: string) => {
    uploadFiles(files, directoryId);
  };

  const handleDirectoryClick = (segment: DirectoryPathSegment) => {
    navigateTo(segment);
  };

  const results = useFileSearch(query);

  const files = results ?? directory?.files;
  const directories = results ? [] : directory?.directories;

  return (
    <FileDragAreaContextProvider>
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
          value={query}
          onChange={handleQueryChange}
        />
        <PathBreadcrumbs
          history={history}
          onBreadcrumbClick={handleDirectoryClick}
        />
        <div className="mb-2">
          <Button onClick={handleCreateFolderClick} icon={<FolderPlus />}>
            Create folder
          </Button>
        </div>
        <DirectoryContentsList
          files={files}
          directories={directories}
          onFilesDropped={handleFilesDropped}
          onDirectoryClick={handleDirectoryClick}
        />
      </NamedContainer>
    </FileDragAreaContextProvider>
  );
};

export default BrowseRoute;
