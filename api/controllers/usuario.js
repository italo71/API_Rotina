
  const customerWalletsDB = require('../data/usuario.json');
  const controller = {};
  const db = require("../../config/db");
class task {
  async selectCustomers(req, res) {
    console.log('oi')
    //db = require("../../config/db");
    const client = await db.connect();
    const result = await client.query('SELECT * FROM usuario');
    console.log(result.rows)
    await res.json(result.rows);
  }

  async updateCustomer(req) {
    const client = await db.connect();
    const sql = 'UPDATE clientes SET nome=$1, idade=$2, uf=$3 WHERE id=$4';
    const values = [customer.nome, customer.idade, customer.uf, id];
    return await client.query(sql, values);
  }

  async insertCustomer(req) {
    console.log(req)
    const client = await db.connect();
    const sql = 'INSERT INTO usuario(nome,login,senha,email) VALUES ($1,$2,$3,$4);';
    const values = [req.nome, req.login, req.senha, req.email];
    return await client.query(sql, values);
  }
}
module.exports = new task()