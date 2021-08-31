const config = {
  api: {
    absoluteUrl:
      process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'http://localhost:5000',
    baseUrl: '/api',
    endpoints: {
      token: {
        root: '/token',
        new: '/token/new'
      },
      file: (fileId?: string) => resourceOfId('file', fileId),
      directory: (directoryId?: string) =>
        resourceOfId('directory', directoryId),
      user: '/user',
      platform: {
        root: '/platform',
        settings: '/platform/settings',
        registrationSettings: '/platform/settings/registration'
      }
    }
  }
};

const resourceOfId = (resourceName: string, resourceId?: string) => {
  let url = `/${resourceName}`;
  if (resourceId) {
    url += `/${resourceId}`;
  }
  return url;
};

export const routes = {
  auth: (place?: 'signIn' | 'signUp', returnUrl?: string) => {
    if (!place) return '/auth';
    let url = `/auth/${place}`;
    if (returnUrl) {
      url += `?returnUrl=${encodeURIComponent(returnUrl)}`;
    }
    return url;
  },
  admin: '/admin',
  browseFiles: '/browse',
  directory: (directoryId?: string) => resourceOfId('directory', directoryId)
};

export default config;
