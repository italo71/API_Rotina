async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        //connectionString: 'postgres://postgres:123@localhost:5432/rotina'
        connectionString: 'postgres://timpadmin:0709!!Bi@timp.postgres.database.azure.com/postgres?sslmode=require'
    });

    //apenas testando a conexão
    const client = await pool.connect();
    //console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    //console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

module.exports = { connect }