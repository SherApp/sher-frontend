import { Upload } from '@sherapp/sher-shared/upload';
import { UserFile } from '@sherapp/sher-shared';

export const uploadToFile = (upload: Upload): UserFile => ({
  fileName: upload.name,
  slug: '',
  length: upload.size,
  isDeleted: false,
  id: upload.id
});
