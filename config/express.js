const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const user = require('../api/controllers/usuario');
const { json } = require('body-parser');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));


  app.get('/user/get', function (req, res) {
    return user.selectCustomers(req, res)
  })

  app.get('/', function (req, res) {
    res.json({ message: "Welcome to my Api" });
  });

  // MIDDLEWARES
  app.use(bodyParser.json());

  return app;
};