const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.Promise = require('bluebird');

mongoose.connect(config.db, { useMongoClient: true });
const db = mongoose.connection;

db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});

console.log(`connecté à la base de donnée de ${process.env.NODE_ENV} --> ${config.db}`);

const app = express();

module.exports = require('./config/express')(app, config);