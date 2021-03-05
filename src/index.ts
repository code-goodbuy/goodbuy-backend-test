import express from 'express';
import cors from 'cors';
import logging from './config/logging';

// Variables
// ========================================
const router = express();
const PORT = process.env.PORT || 1337;
const VERSION = process.env.VERSION || '1.0.0';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const NAMESPACE = 'Server';

// Configurations
// ========================================
router.use(cors());

// Log request middleware
// ========================================
router.use((req, res, next) => {
  // log req
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  // listener when anything is finished
  res.on('finish', () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

// Endpoints
// ========================================
router.get('/', (req, res) =>
  res.send({ version: VERSION, environment: ENVIRONMENT })
);

// Server
// ========================================
router.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// TODO change main AWS account to one of IAM USER not main one
