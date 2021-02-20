import { useEffect, useState } from 'react';

const useMenuVisibility = (toggleRef: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!toggleRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      } else {
        setIsVisible((p) => !p);
      }
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [toggleRef]);

  return {
    isVisible
  };
};

export default useMenuVisibility;
