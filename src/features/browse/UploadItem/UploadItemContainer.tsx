import { Transition } from '@headlessui/react';
import Squashable from '../../../components/Squashable';
import clsx from 'clsx';
import React from 'react';

interface Props {
  children?: JSX.Element;
  squash?: boolean;
  highlight?: boolean;
}

const UploadItemContainer = ({ children, squash, highlight }: Props) => {
  const classes = clsx(
    'grid grid-cols-upload lg:gap-8 md:gap-4 gap-2 py-5 px-5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 data-center border-2',
    highlight
      ? 'border-dashed border-pink'
      : 'dark:border-gray-800 border-t-transparent border-l-transparent border-r-transparent'
  );

  return (
    <Transition
      appear
      show
      enterFrom="translate-y-8 opacity-0"
      enter="transition-all transform duration-500"
      enterTo="translate-y-0 opacity-100"
    >
      <Squashable squash={squash}>
        {children &&
          React.cloneElement(children, {
            ...children.props,
            className: clsx(children.props.className, classes)
          })}
      </Squashable>
    </Transition>
  );
};

export default UploadItemContainer;
