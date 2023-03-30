
const db = require("../../config/db");
class task {
  async selectCustomers(req, res) {
    const client = await db.connect();
    var result = '';
    /* if(req.type == "login"){
      result = await client.query(`SELECT * FROM usuario WHERE LOGIN = '${req.login}' AND SENHA = '${req.senha}'`);
    } */
    //
    //console.log(result.rows)
    //return result
    //await res.json((result.rows == null || result.rows == undefined)?{status:"erro", message:"usuario nao encontrado"}:result.rows);
  }

  async selectLogin(req, res) {
    const client = await db.connect();
    let result;
    let vSQL = `SELECT id,nome,email,data_nasc FROM usuario WHERE LOGIN = '${req.login}' AND SENHA = '${req.senha}' limit 1`
    result = await client.query(vSQL);
    if (result.rowCount == 0) {
      let e = { "status": "erro", "message": "usuário não encontrado" }
      return e
    }
    return { "status": "success", "data": result.rows[0] };
  }

  async updateCustomer(req, res) {
    const client = await db.connect();
    const sql = 'UPDATE clientes SET nome=$1, login=$2, senha=$3, email=$4 WHERE id=$5';
    const values = [req.nome, req.login, req.senha, req.email, req.id];
    await res.json(client.query(sql, values));
  }

  async validaLogin(req, res) {
    const client = await db.connect();
    let sql = `select * from usuario where login = '${req.login}'`
    let r = await client.query(sql)
    if (r.rowCount == 0)
      res.status(200).send({ "status": "success", "data": "usuario livre" })
    else
      res.status(200).send({ "status": "erro", "message": "login ja cadastrado" })
  }

  async insertCustomer(req, res) {
    const client = await db.connect();
    var sql = `INSERT INTO usuario(nome,login,senha,email,data_nasc) VALUES ('${req.nome}','${req.login}','${req.senha}','${req.email}','${req.data_nasc}');`;
    console.log(sql)
    let r = await client.query(sql);
    if (r.rowCount != 0) {
      let result = { "status": "success", "message": "usuario salvo" }
      return result
    }
    return { "status": "erro", "mensage": "Erro ao criar usuario" }
  }
}
module.exports = new task()