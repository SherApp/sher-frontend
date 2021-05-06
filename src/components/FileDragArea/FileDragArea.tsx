import React, { useEffect, useState } from 'react';
import { useFileDragArea } from './FileDragAreaContext';

interface Props {
  as?: string;
  onFilesSelected?: (files: FileList) => void;
  children(dragIn: boolean): JSX.Element;
  [key: string]: any;
}

const FileDragArea = ({
  as = 'div',
  onFilesSelected,
  children,
  ...rest
}: Props) => {
  const [dragIn, setDragIn] = useState(false);
  const { setShowInfo } = useFileDragArea();

  const handleDragEnter = (e: React.DragEvent) => {
    e.stopPropagation();
    setDragIn(true);
  };

  const handleDragExit = () => {
    setDragIn(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragIn(false);
    if (e.dataTransfer.items.length > 0) {
      onFilesSelected?.(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setShowInfo?.(dragIn);
  }, [setShowInfo, dragIn]);

  return React.createElement(
    as,
    {
      ...rest,
      onDragEnter: handleDragEnter,
      onDragExit: handleDragExit,
      onDrop: handleDrop,
      onDragOver: handleDragOver
    },
    children(dragIn)
  );
};

export default FileDragArea;
