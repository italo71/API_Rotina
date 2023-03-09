
  const customerWalletsDB = require('../data/usuario.json');
  const controller = {};
  const db = require("../../config/db");
class task {
  async selectCustomers(req, res) {
    const client = await db.connect();
    var result = '';
    console.log(req.type)
    /* if(req.type == "login"){
      result = await client.query(`SELECT * FROM usuario WHERE LOGIN = '${req.login}' AND SENHA = '${req.senha}'`);
    } */
    //
    //console.log(result.rows)
    //return result
    //await res.json((result.rows == null || result.rows == undefined)?{status:"erro", message:"usuario nao encontrado"}:result.rows);
  }

  async selectLogin(req, res){
    const client = await db.connect();
    let result;
    result = await client.query(`SELECT nome,email FROM usuario WHERE LOGIN = '${req.login}' AND SENHA = '${req.senha} limit 1'`);
    if(result.rowCount == 0){
    let e = {"status":"erro","message":"usuário não encontrado"}
      return e
    }
    return result.rows;
  }

  async updateCustomer(req, res) {
    const client = await db.connect();
    const sql = 'UPDATE clientes SET nome=$1, login=$2, senha=$3, email=$4 WHERE id=$5';
    const values = [req.nome, req.login, req.senha, req.email, req.id];
    await res.json(client.query(sql, values));
  }

  async insertCustomer(req, res) {
    const client = await db.connect();
    const sql = 'INSERT INTO usuario(nome,login,senha,email) VALUES ($1,$2,$3,$4);';
    const values = [req.nome, req.login, req.senha, req.email];
    
    let r = await client.query(sql, values);
    let result = {"message":"usuario salvo"}
    await res.json(result);
  }
}
module.exports = new task()