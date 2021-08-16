import { useEffect, useState } from 'react';
import { UserFile } from '@sherapp/sher-shared';
import { fetchUserUploadedFiles } from './apiCalls';
import _ from 'lodash';

const useFileSearch = (requiredFileNamePart: string) => {
  const [results, setResults] = useState<UserFile[] | null>(null);

  useEffect(() => {
    if (_.isEmpty(requiredFileNamePart)) {
      setResults(null);
    } else {
      fetchUserUploadedFiles({ requiredFileNamePart }).then(setResults);
    }
  }, [requiredFileNamePart]);

  return results;
};

export default useFileSearch;
