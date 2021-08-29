import { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared';
import _ from 'lodash';
import { useApiClient } from '../../api/useApiClient';

const useFileSearch = (requiredFileNamePart: string) => {
  const apiClient = useApiClient();

  const [results, setResults] = useState<UserFile[] | null>(null);

  useEffect(() => {
    if (_.isEmpty(requiredFileNamePart)) {
      setResults(null);
    } else {
      apiClient
        .fetchUserUploadedFiles({ requiredFileNamePart })
        .then(setResults);
    }
  }, [requiredFileNamePart]);

  return results;
};

export default useFileSearch;
