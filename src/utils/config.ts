const config = {
  okta: {
    domain: process.env.REACT_APP_OKTA_DOMAIN,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID
  },
  api: {
    url: process.env.REACT_APP_API_URL ?? 'http://localhost:5000/',
    endpoints: {
      fileUpload: 'file'
    }
  },
  uploads: {
    url: process.env.REACT_APP_UPLOADS_URL ?? 'http://localhost:5000/u/'
  }
};

export default config;
