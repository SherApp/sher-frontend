import { useLayoutEffect, useRef, useState } from 'react';
import { squashAnimation } from '../sharedUtils/squashAnimation';
import { useInitialValue } from '../utils/useInitialValue';

interface Props {
  children?: JSX.Element;
  squash?: boolean;
  timeout?: number;
}

const Squashable = ({ children, squash, timeout = 0 }: Props) => {
  const [height, setHeight] = useState<number>();
  const wasSquashedOnInit = useInitialValue(squash);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (wasSquashedOnInit && squash) {
      setHeight(0);
      return;
    }

    const fn = () => {
      if (!squash) return;

      const height = ref.current?.offsetHeight;
      if (!height) return;

      squashAnimation({
        baseHeight: height,
        duration: 150,
        onAnimationFrame: setHeight
      });
    };

    if (timeout === 0) {
      fn();
      return;
    }

    window.setTimeout(fn, timeout);
  }, [squash, timeout, wasSquashedOnInit]);

  return (
    <div
      className="overflow-hidden"
      ref={ref}
      {...(squash ? { style: { height } } : {})}
    >
      {children}
    </div>
  );
};

export default Squashable;
