const config = {
  okta: {
    domain: process.env.REACT_APP_OKTA_DOMAIN,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID
  },
  api: {
    endpoints: {
      token: {
        root: '/token',
        new: '/token/new'
      },
      fileUpload: '/file',
      user: '/user',
      platform: {
        root: '/platform',
        settings: '/platform/settings'
      }
    }
  },
  uploads: {
    url: process.env.REACT_APP_UPLOADS_URL ?? 'http://localhost:5000/u/'
  }
};

export const routes = {
  auth: (place?: 'signIn' | 'signUp') => {
    if (!place) return '/auth';
    return `/auth/${place}`;
  },
  admin: '/admin',
  browseFiles: '/browse'
};

export default config;
