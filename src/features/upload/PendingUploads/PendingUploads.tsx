import { useUploadsInfo } from '../UploadsInfoContext';
import PendingUploadsHeader from './PendingUploadsHeader';
import PendingUploadsList from './PendingUploadsList';
import { Transition } from '@headlessui/react';
import { useRef, useState } from 'react';

const PendingUploads = () => {
  const { uploads } = useUploadsInfo();

  const headerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  const headerHeight = headerRef?.current?.offsetHeight ?? 0;

  return (
    <div className="fixed right-6 bottom-0">
      <Transition
        show={!!uploads && uploads.length > 0}
        enterFrom="translate-y-full"
        enter="transition-all transform duration-500"
        enterTo="translate-y-0"
      >
        <div
          className="w-80 shadow transition-all"
          style={{
            ...(collapsed
              ? { transform: `translateY(calc(100% - ${headerHeight}px))` }
              : { top: 20 })
          }}
        >
          <PendingUploadsHeader
            onToggleClick={() => setCollapsed((p) => !p)}
            isOpen={!collapsed}
            ref={headerRef}
          />
          <PendingUploadsList uploads={uploads} />
        </div>
      </Transition>
    </div>
  );
};

export default PendingUploads;
