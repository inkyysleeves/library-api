const express = require('express');
const usersControllers = require('./controllers/users');

const app = express();
app.use(express.json());

app.post('/users', usersControllers.create);

module.exports = app;
