const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const httpStatus = require('http-status');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  app.use('/', (req, res, next) => {
    res.status(httpStatus.MOVED_PERMANENTLY);
    res.location(`${req.protocol}://${req.get('host')}${req.originalUrl}graphql`);
    res.send();
  });

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = httpStatus.NOT_FOUND;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
      res.send(
        {
          message: err.message,
          error: err,
          title: 'error'
        }
      );
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.send(
      {
        message: err.message,
        error: err,
        title: 'error'
      }
    );
  });

  return app;
};
