import { useHistory } from 'react-router-dom';

const useDirectoryNavigation = () => {
  const history = useHistory();

  const navigateTo = (directoryId?: string) => {
    history.push({
      pathname: '/browse',
      search: directoryId ? `?directoryId=${directoryId}` : undefined
    });
  };

  return { navigateTo };
};

export default useDirectoryNavigation;
