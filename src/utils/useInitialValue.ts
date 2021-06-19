import { useRef } from 'react';

export const useInitialValue = <T>(value: T) => {
  return useRef(value).current;
};
