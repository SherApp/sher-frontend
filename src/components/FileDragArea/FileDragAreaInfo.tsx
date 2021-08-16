import Typography from '../Typography';
import { UploadCloud } from 'react-feather';
import React from 'react';
import { useFileDragArea } from './FileDragAreaContext';
import { Transition } from '@headlessui/react';

const FileDragAreaInfo = () => {
  const { showInfo } = useFileDragArea();

  return (
    <Transition
      show={!!showInfo}
      enterFrom="translate-y-full"
      enter="transition-transform duration-500"
      enterTo="translate-y-0"
      leaveFrom="translate-y-0"
      leave="transition-transform duration-500"
      leaveTo="translate-y-full"
      className="fixed w-1/2 bottom-0 p-8 left-1/2 transform rounded-t shadow-lg -translate-x-1/2 flex flex-col items-center bg-gray-200 pointer-events-none dark:bg-gray-800"
    >
      <UploadCloud className="text-pink mb-2" size={36} />
      <Typography>Drop to begin uploading</Typography>
    </Transition>
  );
};

export default FileDragAreaInfo;
