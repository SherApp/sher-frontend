import React from 'react';
import Typography from '../Typography';
import { X } from 'react-feather';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onCloseClick?(): void;
  children?: string;
}

const DialogHeader = ({ onCloseClick, children, ...rest }: Props) => (
  <div
    className="bg-gray-200 dark:bg-gray-800 px-4 py-3 flex justify-between items-center"
    {...rest}
  >
    <Typography variant="h4">{children}</Typography>
    <X />
  </div>
);

export default DialogHeader;
