import express from 'express';
import cors from 'cors';
import logging from './config/logging';

const router = express();
const PORT = process.env.PORT || 1337;
const VERSION = process.env.VERSION || '1.0.0';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const NAMESPACE = 'Server';

router.use(cors());

router.use((req, res, next) => {
  // TODO need to be predefined on production
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

router.get('/', (req, res) =>
  res.send({ version: VERSION, environment: ENVIRONMENT })
);

router.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// TODO change main AWS account to one of IAM USER not main one
