import React from 'react';
import Typography, { TypographyProps } from '../../components/Typography';
import fileSize from 'filesize';
import ProgressBar from '../../components/ProgressBar';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { squashAnimation } from '../../sharedUtils/squashAnimation';
import { Transition } from '@headlessui/react';

interface UploadItemProps {
  icon?: JSX.Element;
  name: string;
  size?: number;
  progress?: number;
  actions?: JSX.Element;
  squash?: boolean;
  onClick?(): void;
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
  squash,
  onClick
}: UploadItemProps) => {
  const [height, setHeight] = useState<number>();

  const containerRef = useRef<HTMLElement>(null);

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

  const classes = clsx('overflow-hidden block', [
    onClick && 'cursor-pointer text-left w-full'
  ]);

  const ParentElement: React.FC = ({ children }) => {
    return React.createElement(onClick ? 'button' : 'div', {
      className: classes,
      ref: containerRef,
      onClick: onClick,
      children,
      ...(squash ? { style: { height } } : {})
    });
  };

  return (
    <Transition
      show
      enterFrom="translate-y-8"
      enter="transition-transform transform duration-500"
      enterTo="translate-y-0"
    >
      <ParentElement>
        <div className="grid grid-cols-upload lg:gap-8 md:gap-4 gap-2 border-b-2 dark:border-gray-800 py-5 px-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 items-center">
          <div>{icon}</div>
          <Text>{name}</Text>
          {size && <Text>{fileSize(size)}</Text>}
          {progress !== undefined && (
            <ProgressBar progress={progress} fullWidth />
          )}
          <div className="flex">{actions}</div>
        </div>
      </ParentElement>
    </Transition>
  );
};

export default UploadItem;
