import useDirectory from './useDirectory';
import { useLocation } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import NamedContainer from '../../components/NamedContainer';
import React, { useEffect, useState } from 'react';
import DirectoryFilesList from './DirectoryFilesList';
import PathBreadcrumbs from './PathBreadcrumbs';
import useFileSearch from './useFileSearch';

const BrowseRoute = () => {
  const [query, setQuery] = useState('');
  const [path, setPath] = useState<string[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const directoryId = new URLSearchParams(useLocation().search).get(
    'directoryId'
  );
  const { directory } = useDirectory(directoryId ?? undefined);
  const results = useFileSearch(query);

  useEffect(() => {
    if (directory) {
      setPath((prev) => [...prev, directory.name]);
    }
  }, [directory]);

  const files = results ?? directory?.files;

  return (
    <NamedContainer title="Files">
      <TextInput
        variant="contained"
        label="Search"
        className="mb-2"
        value={query}
        onChange={handleQueryChange}
      />
      <PathBreadcrumbs segments={path} />
      <DirectoryFilesList files={files} />
    </NamedContainer>
  );
};

export default BrowseRoute;
