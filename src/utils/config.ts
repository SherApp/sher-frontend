const config = {
  okta: {
    domain: process.env.REACT_APP_OKTA_DOMAIN,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID
  },
  api: {
    endpoints: {
      token: {
        root: 'token',
        new: 'token/new'
      },
      fileUpload: 'file',
      user: 'user',
      platform: {
        root: 'platform',
        settings: 'platform/settings'
      }
    }
  },
  uploads: {
    url: process.env.REACT_APP_UPLOADS_URL ?? 'http://localhost:5000/u/'
  }
};

export default config;
