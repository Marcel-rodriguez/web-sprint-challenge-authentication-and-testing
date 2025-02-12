const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')

const restrict = require('./middleware/restricted.js');

//routes
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');
const usersRouter = require('./users/users-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

//routers
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

//fallback error
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;
