const db = require("../../config/db");
class task{
    async postTarefas(req,res) {
        const client = await db.connect();
        let sql = `INSERT INTO tarefas (data_criacao,) VALUES (current_date,)`;
    }
}

module.exports = new task()