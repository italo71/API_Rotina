const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const user = require('../api/controllers/usuario');
const { json } = require('body-parser');
const { response } = require('express');

module.exports = () => {
  const app = express();
  var jsonParser = bodyParser.json()

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));


  app.post('/user/get', jsonParser, async function (req, res) {
    let r;
    if (req.body.type == 'login') {
      r = await user.selectLogin(req.body, res);
      if(r.status == 'erro')
      res.status(404).send(r)
    }
    else{
      let e = {"status":"erro", "message":"Tipo de requisição não suportada"}
      res.status(400).send(e)
    }
    res.status(200).send(r)
  })

  app.post('/user/post', jsonParser, async function (req, res) {
    let response
    try {
      response = await user.insertCustomer(req.body, res)
    } catch (e) {
      response = e
      res.status(200).send(e)
    }
    console.log(response)
    return response
  })

  app.get('/', function (req, res) {
    res.json({ message: "Welcome to my Api" });
  });

  // MIDDLEWARES
  app.use(bodyParser.json());

  return app;
};