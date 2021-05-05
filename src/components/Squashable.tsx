import { useEffect, useRef, useState } from 'react';
import { squashAnimation } from '../sharedUtils/squashAnimation';

interface Props {
  children?: JSX.Element;
  squash?: boolean;
}

const Squashable = ({ children, squash }: Props) => {
  const [height, setHeight] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!squash) return;

    const height = ref.current?.offsetHeight;
    if (!height) return;

    squashAnimation({
      baseHeight: height,
      duration: 150,
      onAnimationFrame: setHeight
    });
  }, [squash]);

  return (
    <div ref={ref} {...(squash ? { style: { height } } : {})}>
      {children}
    </div>
  );
};

export default Squashable;
