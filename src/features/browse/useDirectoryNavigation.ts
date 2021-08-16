import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';

export interface DirectoryPathSegment {
  id?: string;
  name: string;
  index?: number;
}

interface LocationState {
  segments?: DirectoryPathSegment[];
}

const useDirectoryNavigation = () => {
  const location = useLocation();
  const history = useHistory();

  const locationState = location.state as LocationState;

  const navigateTo = ({ id, name }: DirectoryPathSegment) => {
    let newState = _.clone(locationState);
    if (!id) {
      newState = { segments: [] };
    } else {
      if (newState?.segments) {
        const index = newState.segments.findIndex((s) => s.id === id);
        if (index !== -1) {
          newState.segments = newState.segments.slice(0, index + 1);
        } else {
          newState.segments = [...newState.segments, { id, name }];
        }
      } else {
        newState = {
          segments: [{ id, name }]
        };
      }
    }

    history.push({
      pathname: '/browse',
      search: id ? `?directoryId=${id}` : undefined,
      state: newState
    });
  };

  return { navigateTo, history: locationState?.segments };
};

export default useDirectoryNavigation;
