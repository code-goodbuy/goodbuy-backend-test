import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// config
import logging from './config/logging';
import config from './config/config';

// routes
import sampleRoutes from './routes/sample';
import productRoutes from './routes/product';
import userRoutes from './routes/user';

const router = express();
const PORT = process.env.PORT || 1337;
const VERSION = process.env.VERSION || '1.0.0';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const NAMESPACE = 'Server';

// Connect to MongoDB
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, 'Connected to mongoDB.');
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// logging the request
router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

/* ======================================================================================== */
// order matters top to bottom
// middleware stack
router.disable('x-powered-by');
router.use(cors()); // cors middleware allows API approachable to other domains
router.use(morgan('dev')); // logging middleware
router.use(bodyParser.urlencoded({ extended: true })); // allow attaching params to a URL
router.use(bodyParser.json()); // bodyParser deprecated
// rule for API
router.use((req, res, next) => {
  // TODO '*' needs to be fixed on production - now it's accepting everything
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
/* ======================================================================================== */

// routes
router.get('/', (req, res) =>
  res.send({ version: VERSION, environment: ENVIRONMENT })
);
// mounted routes
router.use('/api/sample', sampleRoutes);
router.use('/api/products', productRoutes);
router.use('/api/users', userRoutes);

// Error handling - should be the last of middleware order
router.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: error.message
  });
});

// create server
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running on ${config.server.hostname}:${config.server.port}`
  )
);
