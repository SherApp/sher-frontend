const config = {
  api: {
    baseUrl: '/api',
    endpoints: {
      token: {
        root: '/token',
        new: '/token/new'
      },
      fileUpload: '/file',
      directory: '/directory',
      user: '/user',
      platform: {
        root: '/platform',
        settings: '/platform/settings',
        registrationSettings: '/platform/settings/registration'
      }
    }
  },
  uploads: {
    url: process.env.REACT_APP_UPLOADS_URL ?? 'http://localhost:5000/u/'
  }
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
  browseFiles: '/browse'
};

export default config;
