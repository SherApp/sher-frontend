import Typography from '../../../components/Typography';
import { ChevronDown, ChevronUp } from 'react-feather';
import IconButton from '../../../components/IconButton';
import React from 'react';

interface Props {
  isOpen?: boolean;
  onToggleClick?(): void;
}

const PendingUploadsHeader = (
  { isOpen, onToggleClick }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className="text-white bg-gradient-r-purple-pink px-4 py-3 flex justify-between items-center rounded-t"
    >
      <Typography variant="h5">Uploads</Typography>
      <IconButton onClick={onToggleClick}>
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </IconButton>
    </div>
  );
};

export default React.forwardRef(PendingUploadsHeader);
