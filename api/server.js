const express = require('express');

const server = express();
const usersRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');

server.use(logger)
server.use(express.json())
server.use('/api/users', usersRouter)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
