const path = require('path');

module.exports = {
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/goe',

  modelsPath: path.resolve('app', 'models'),
};
