require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const connectDB = require('./config/database');
require('./models');
const Port =
  process.env.NODE_ENV && process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT || 4001
    : process.env.PORT || 4000;
// Api documentations
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./nodeApiDocs.yaml');

//Configure Mongoose
connectDB();

// allowed Origins
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN.split(',') || '',
  credentials: true
};

app.use(cors(corsOptions));
// Api request Logger
const logger =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
app.use(morgan(logger));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});
app.use(morgan(logger, { stream: accessLogStream }));
// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Api routes
app.get('/healthcheck', async (_req, res) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});
app.use('/api', require('./router'));
app.use('/api/public', express.static(path.join(__dirname, 'public')));
app.use('/docs/swagger-docs', (req, res) => {
  res.send(swaggerJsDocs);
});
app.use('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'nodeApiRedoc.html'));
});
app.get(['*', '/api/*'], function (req, res) {
  res.status(404).json({
    errors: {
      message: 'Route Not Found'
    }
  });
});

//server port listining
server.listen(Port, function () {
  console.log(`Listening on port ${Port}!`);
});
module.exports = app;
