import config from '../utils/config';

export const getUploadLink = (uploadId: string, uploadName: string) =>
  encodeURI(`${config.uploads.url}${uploadId}/${uploadName}`);
