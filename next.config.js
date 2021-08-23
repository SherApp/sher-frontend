const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  async rewrites() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*'
          }
        ]
      : [];
  }
});
