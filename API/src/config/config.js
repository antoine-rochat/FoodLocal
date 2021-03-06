const path = require('path');

const rootPath = path.normalize(`${__dirname}/../..`);
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'API FoodLocal'
    },
    port: process.env.PORT || 3000,
    portWs: process.env.PORT_WS || 3030,
    db: `mongodb://${process.env.MONGODB_HOST_DEV}:${process.env.MONGODB_PORT_DEV}/${process.env.MONGODB_DBNAME_DEV}?replicaSet=${process.env.REPLICA_SET_NAME_DEV}`,
    jwtSecret: process.env.JWT_SECRET
  },

  test: {
    root: rootPath,
    app: {
      name: 'API FoodLocal'
    },
    port: process.env.PORT || 3000,
    portWs: process.env.PORT_WS || 3030,
    db: `mongodb://${process.env.MONGODB_HOST_TEST}:${process.env.MONGODB_PORT_TEST}/${process.env.MONGODB_DBNAME_TEST}?replicaSet=${process.env.REPLICA_SET_NAME_TEST}`,
    jwtSecret: process.env.JWT_SECRET
  },

  production: {
    root: rootPath,
    app: {
      name: 'API FoodLocal'
    },
    port: process.env.PORT || 3000,
    portWs: process.env.PORT_WS || 3030,
    db: `mongodb://${process.env.MONGODB_HOST_PROD}:${process.env.MONGODB_PORT_PROD}/${process.env.MONGODB_DBNAME_PROD}?replicaSet=${process.env.REPLICA_SET_NAME_PROD}`,
    jwtSecret: process.env.JWT_SECRET
  }
};

module.exports = config[env];
