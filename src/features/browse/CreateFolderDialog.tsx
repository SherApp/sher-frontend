import Dialog, {
  DialogButtons,
  DialogContent,
  DialogHeader
} from '../../components/Dialog';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const CreateFolderDialog = () => {
  return (
    <Dialog aria-labelledby="folder-dialog-header">
      <DialogHeader id="folder-dialog-header">Create a folder</DialogHeader>
      <DialogContent>
        <TextInput label="Folder name" />
        <DialogButtons>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </DialogButtons>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
