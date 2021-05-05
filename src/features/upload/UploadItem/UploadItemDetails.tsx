import fileSize from 'filesize';
import ProgressBar from '../../../components/ProgressBar';
import React from 'react';
import Typography, { TypographyProps } from '../../../components/Typography';
import clsx from 'clsx';

const Text = ({ className, ...rest }: TypographyProps) => (
  <Typography
    component="p"
    className={clsx(
      'overflow-hidden overflow-ellipsis whitespace-nowrap',
      className
    )}
    {...rest}
  />
);

export interface UploadItemDetailsProps {
  icon?: JSX.Element;
  name: string;
  size?: number;
  progress?: number;
  actions?: JSX.Element;
}

const UploadItemDetails = ({
  icon,
  name,
  size,
  progress,
  actions
}: UploadItemDetailsProps) => {
  return (
    <>
      <div>{icon}</div>
      <Text>{name}</Text>
      {size && <Text>{fileSize(size)}</Text>}
      {progress !== undefined && <ProgressBar progress={progress} fullWidth />}
      <div className="flex">{actions}</div>
    </>
  );
};

export default UploadItemDetails;
