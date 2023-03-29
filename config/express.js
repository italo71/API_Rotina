const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const user = require('../api/controllers/usuario');
const { json } = require('body-parser');
const { response } = require('express');
const tarefas = require('../api/controllers/tarefas')
const cors = require('cors');

module.exports = () => {
  const app = express();
  var jsonParser = bodyParser.json()
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
  });

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  app.post('/tarefas', jsonParser, async function (req, res) {
    let r;
    if (req.body.type == null) {
      r = await tarefas.postTarefas(req.body, res)
      if (r.status == 'erro') {
        res.status(200).send(r)
      }
      else {
        res.status(200).send(r)
      }
    }
    else if (req.body.type == 'get_user') {
      r = await tarefas.getTarefasByUserID(req.body, res)
      if (r.status == 'erro') {
        res.status(200).send(r)
      }
      else {
        res.status(200).send(r)
      }
    }
    res.status(400).send()
  });

  app.post('/user/get', jsonParser, async function (req, res) {
    let r;
    if (req.body.type == 'login') {
      r = await user.selectLogin(req.body, res);
      if (r.status == 'erro')
        res.status(404).send(r)
    }
    else {
      let e = { "status": "erro", "message": "Tipo de requisição não suportada" }
      res.status(400).send(e)
    }
    res.status(200).send(r)
  });

  app.post('/user/post', jsonParser, async function (req, res) {
    let response

    response = await user.insertCustomer(req.body, res)
    res.status(200).send(response)
  });

  app.get('/', function (req, res) {
    res.json({ message: "Welcome to Rotina's API" });
  });

  // MIDDLEWARES


  return app;
};