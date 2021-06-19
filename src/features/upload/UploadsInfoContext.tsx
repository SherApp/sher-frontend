import React, { useContext, useState } from 'react';
import { Upload } from '@sherapp/sher-shared';

type PartialOrUpload = Pick<Upload, 'id'> & Partial<Omit<Upload, 'id'>>;
type UploadWithDirectory = Upload & { directoryId: string };

interface UploadsContextType {
  addOrUpdateUpload?(upload: PartialOrUpload): void;
  uploads?: UploadWithDirectory[];
}

const UploadsInfoContext = React.createContext<UploadsContextType>({});

export const useUploadsInfo = () => useContext(UploadsInfoContext);

export const UploadsInfoContextProvider = ({
  children
}: React.PropsWithChildren<{}>) => {
  const [uploads, setUploads] = useState<UploadWithDirectory[]>([]);

  const addOrUpdateUpload = (upload: PartialOrUpload) => {
    setUploads((prev) => {
      const newUploads = [...prev];
      const existingUpload = newUploads.find((u) => u.id === upload.id);

      if (existingUpload) {
        Object.assign(existingUpload, upload);
      } else {
        newUploads.push(upload as UploadWithDirectory);
      }

      return newUploads;
    });
  };

  const value = { uploads, addOrUpdateUpload };

  return (
    <UploadsInfoContext.Provider value={value}>
      {children}
    </UploadsInfoContext.Provider>
  );
};
