import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { routes } from '../../utils/config';
import { DirectorySummary } from '@sherapp/sher-shared';

interface Props {
  path?: DirectorySummary[];
}

const PathBreadcrumbs = ({ path }: Props) => {
  const router = useRouter();

  const handleClick = async (directory: DirectorySummary) => {
    await router.push(routes.directory(directory.id));
  };

  if (!path) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 my-4">
      {[...path].reverse().map((directory) => (
        <Transition
          appear={true}
          key={directory.id}
          show
          enterFrom="translate-y-8 opacity-0"
          enter="transition-all transform duration-500"
          enterTo="translate-y-0 opacity-100"
        >
          <button
            onClick={() => handleClick(directory)}
            className="bg-gradient-r-purple-pink rounded-full text-white px-4 py-1.5"
          >
            {directory.name}
          </button>
        </Transition>
      ))}
    </div>
  );
};

export default PathBreadcrumbs;
