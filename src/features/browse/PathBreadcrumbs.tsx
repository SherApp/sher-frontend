import homeDir from '../../img/homeDir.svg';

interface Props {
  segments: string[];
}

const PathBreadcrumbs = ({ segments }: Props) => {
  return (
    <div className="flex items-center space-x-2 my-4">
      <img src={homeDir} alt="Root directory" />
      {segments
        .filter((s) => s !== 'Root')
        .map((segment, i) => (
          <div
            key={i}
            className="bg-gradient-r-purple-pink rounded-full text-white px-4 py-1.5"
          >
            {segment}
          </div>
        ))}
    </div>
  );
};

export default PathBreadcrumbs;
