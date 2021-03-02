import Typography, { TypographyProps } from '../../components/Typography';
import fileSize from 'filesize';
import ProgressBar from '../../components/ProgressBar';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { squashAnimation } from '../../sharedUtils/squashAnimation';

interface UploadItemProps {
  icon?: JSX.Element;
  name: string;
  size: number;
  progress?: number;
  actions?: JSX.Element;
  squash?: boolean;
}

const Text = ({ className, ...rest }: TypographyProps) => (
  <Typography
    component="p"
    className={clsx(
      'overflow-hidden overflow-ellipsis whitespace-nowrap',
      className
    )}
    {...rest}
  />
);

const UploadItem = ({
  icon,
  name,
  size,
  progress,
  actions,
  squash
}: UploadItemProps) => {
  const [height, setHeight] = useState<number>();

  const containerRef = useRef<HTMLDivElement>(null);

  const classes = clsx(
    'grid',
    progress !== undefined ? 'grid-cols-4' : 'grid-cols-3',
    'lg:gap-8 md:gap-4 border-b-2 dark:border-gray-800 py-5 px-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 items-center'
  );

  useEffect(() => {
    if (!squash) return;

    const height = containerRef.current?.offsetHeight;
    if (!height) return;

    squashAnimation({
      baseHeight: height,
      duration: 150,
      onAnimationFrame: setHeight
    });
  }, [squash]);

  return (
    <div
      className="overflow-hidden animate-slideInTop"
      ref={containerRef}
      {...(squash ? { style: { height } } : {})}
    >
      <div className={classes}>
        <div className="flex">
          <div className="w-8 mr-7">{icon}</div>
          <Text>{name}</Text>
        </div>
        <Text className="text-center">{fileSize(size)}</Text>
        {progress !== undefined && (
          <ProgressBar progress={progress} fullWidth />
        )}
        <div className="flex">{actions}</div>
      </div>
    </div>
  );
};

export default UploadItem;
