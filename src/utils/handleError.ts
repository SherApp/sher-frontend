import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const handleError = (error: AxiosError) => {
  let errorText = error.response?.data?.message ?? error.message;

  if (error.response?.status) {
    errorText += ` (${error.response?.status})`;
  }

  toast.error(`Error: ${errorText}`);
};
