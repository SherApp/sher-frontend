import React, { useCallback, useContext, useEffect, useState } from 'react';

interface FileDragAreaContextType {
  setShowInfo?(show: boolean): void;
  showInfo?: boolean;
}

const FileDragAreaContext = React.createContext<FileDragAreaContextType>({});

export const useFileDragArea = () => useContext(FileDragAreaContext);

interface State {
  show: boolean;
  nextState: boolean;
}

export const FileDragAreaContextProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const [showState, setShowState] = useState<State>({
    show: false,
    nextState: false
  });

  const setShowInfo = useCallback((show: boolean) => {
    setShowState((prev) => ({
      // Show immediately, hide with delay
      show: !prev.show && show ? true : prev.show,
      nextState: show
    }));
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowState((prev) => ({
        ...prev,
        show: prev.nextState
      }));
    }, 20);

    return () => window.clearTimeout(timeout);
  }, [showState.nextState]);

  return (
    <FileDragAreaContext.Provider
      value={{ showInfo: showState.show, setShowInfo }}
    >
      {children}
    </FileDragAreaContext.Provider>
  );
};

export default FileDragAreaContext;
