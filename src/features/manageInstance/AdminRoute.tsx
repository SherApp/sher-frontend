import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import NamedContainer from '../../components/NamedContainer';
import { useEffect, useState } from 'react';
import { PlatformSettings } from '@sherapp/sher-shared/manageInstance';
import { getPlatformSettings, updatePlatformSettings } from './apiCalls';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { handleError } from '../../utils/handleError';

const AdminRoute = () => {
  const [settings, setSettings] = useState<PlatformSettings>();

  useEffect(() => {
    getPlatformSettings().then(setSettings);
  }, []);

  const updatePlatformSettingsMutation = useMutation(
    (settings: PlatformSettings) => updatePlatformSettings(settings),
    {
      onSuccess: () => {
        toast.success('Successfully updated settings!');
      },
      onError: handleError
    }
  );

  const handleInvitationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings({ ...settings, invitationCode: e.target.value });
  };

  const handleSaveClick = async () => {
    if (settings) {
      await updatePlatformSettingsMutation.mutateAsync(settings);
    }
  };

  if (!settings) return null;

  return (
    <NamedContainer
      className="2xl:w-1/2 xl:w-3/5 md:w-3/4"
      title="Platform Settings"
    >
      <div className="my-6 space-y-4">
        <TextInput
          hint="Leave empty to allow registration without invite code"
          label="Invitation code"
          value={settings.invitationCode}
          onChange={handleInvitationCodeChange}
        />
        <div className="flex items-end">
          <Button onClick={handleSaveClick} className="ml-auto">
            Save
          </Button>
        </div>
      </div>
    </NamedContainer>
  );
};

export default AdminRoute;
