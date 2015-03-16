'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  db: {
    "username": "",
    "password": "",
    "database": "ben33_prod",
    "dialect": "sqlite",
    "storage": "data/db.production.sqlite"
  }
};
