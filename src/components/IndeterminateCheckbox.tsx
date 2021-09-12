import React, { useEffect, useRef } from 'react';

interface Props {
  indeterminate?: boolean;
}

const IndeterminateCheckbox = ({ indeterminate = false, ...rest }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  return <input type="checkbox" ref={ref} {...rest} />;
};

export default IndeterminateCheckbox;
