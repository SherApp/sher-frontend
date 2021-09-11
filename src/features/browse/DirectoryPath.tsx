import { routes } from '../../utils/config';
import { DirectorySummary } from '@sherapp/sher-shared';
import { Fragment } from 'react';
import Link from 'next/link';

interface Props {
  path?: DirectorySummary[];
}

const DirectoryPath = ({ path }: Props) => {
  if (!path) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 mb-4 font-bold">
      {[...path].reverse().map((d, i) => (
        <Fragment key={d.id}>
          <Link href={routes.directory(d.id)}>{d.name}</Link>
          {i !== path.length - 1 && <span> / </span>}
        </Fragment>
      ))}
    </div>
  );
};

export default DirectoryPath;
