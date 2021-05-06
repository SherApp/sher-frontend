import homeDir from '../../img/homeDir.svg';
import { Transition } from '@headlessui/react';
import { DirectoryPathSegment } from './useDirectoryNavigation';
import IconButton from '../../components/IconButton';

interface Props {
  history?: DirectoryPathSegment[];
  onBreadcrumbClick?(segment: DirectoryPathSegment): void;
}

const PathBreadcrumbs = ({ history, onBreadcrumbClick }: Props) => {
  const handleClick = (pathSegment: DirectoryPathSegment) => {
    onBreadcrumbClick?.(pathSegment);
  };

  return (
    <div className="flex items-center space-x-2 my-4">
      <IconButton
        aria-label="go to home directory"
        onClick={() => handleClick({ name: 'Root' })}
      >
        <img src={homeDir} alt="Root directory" />
      </IconButton>
      {history
        ?.filter((s) => s.name !== 'Root')
        .map((segment) => (
          <Transition
            appear={true}
            key={segment.id}
            show
            enterFrom="translate-y-8 opacity-0"
            enter="transition-all transform duration-500"
            enterTo="translate-y-0 opacity-100"
          >
            <button
              onClick={() => handleClick(segment)}
              className="bg-gradient-r-purple-pink rounded-full text-white px-4 py-1.5"
            >
              {segment.name}
            </button>
          </Transition>
        ))}
    </div>
  );
};

export default PathBreadcrumbs;
