import Dialog, {
  DialogButtons,
  DialogContent,
  DialogHeader
} from '../../components/Dialog';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { useState } from 'react';

interface Props {
  onClose?(): void;
  onOkClick?(name?: string): void;
  show?: boolean;
}

const CreateFolderDialog = ({ onClose, onOkClick, show }: Props) => {
  const [name, setName] = useState<string>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOkClick = () => {
    onOkClick?.(name);
  };

  if (!show) return null;

  return (
    <Dialog aria-labelledby="folder-dialog-header">
      <DialogHeader id="folder-dialog-header" onCloseClick={onClose}>
        Create a folder
      </DialogHeader>
      <DialogContent>
        <TextInput
          label="Folder name"
          value={name}
          onChange={handleNameChange}
        />
        <DialogButtons>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleOkClick}>OK</Button>
        </DialogButtons>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
