const { response } = require("express");
const db = require("../../config/db");
class task {
    async postTarefas(req, res) {
        const client = await db.connect();
        let sql = `INSERT INTO tarefas (id_usuario,data_criacao,descricao) VALUES ($1,current_date,$2)`;
        const values = [req.id_usu, req.descricao];
        let r = client.query(sql, values)
        let response = {"status":"success","message":"usuario salvo"}
        await res.json(response);
    }
}

module.exports = new task()