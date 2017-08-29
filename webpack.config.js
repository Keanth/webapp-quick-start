const env = process.env.NODE_ENV || 'development';
function config() {
  switch (env) {
    case 'production':
      return 'prod';
    case 'development':
      return 'dev';
    default:
      throw new Error(`Invalid or unknow environment: ${env}`);
  }
}
module.exports = require(`./config/webpack.${config()}.js`);
