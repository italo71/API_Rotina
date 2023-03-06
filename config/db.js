async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:123@localhost:5432/rotina'
    });
 
    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectCustomers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM usuario');
    return res.rows;
}

/* async function updateCustomer(id, customer){
    const client = await connect();
    const sql = 'UPDATE clientes SET nome=$1, idade=$2, uf=$3 WHERE id=$4';
    const values = [customer.nome, customer.idade, customer.uf, id];
    return await client.query(sql, values);
  }*/

async function insertCustomer(customer){
    const client = await connect();
    const sql = 'INSERT INTO usuario(nome,login,senha,email) VALUES ($1,$2,$3,$4);';
    const values = [customer.nome, customer.idade, customer.uf];
    return await client.query(sql, values);
} 
 
module.exports = { selectCustomers }