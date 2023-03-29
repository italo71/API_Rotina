const { response } = require("express");
const db = require("../../config/db");
class task {
    async postTarefas(req, res) {
        console.log(req)
        if ((req.id_usu != null && req.descricao != null) || (req.id_usu != '' && req.descricao != '')) {
            const client = await db.connect();
            let sql = `INSERT INTO tarefas (id_usuario,data_criacao,titulo,descricao) VALUES (${req.id_usu},current_date,'${req.titulo}','${req.descricao}')`;
            //const values = [req.id_usu, req.descricao];
            let r;
            try { r = await client.query(sql) }
            catch (erro) { if (erro.error == undefined) { return { "status": "erro", "messagem": "preencha os dados obrigatorios" } } else return { "status": "erro", "message": "consulte o administrador da aplicação" } }
            let response;
            if (r.rowCount == 0)
                response = { "status": "erro", "message": "Não foi possível realizar a operação" }
            else
                response = { "status": "success", "message": "Tarefa salva com sucesso" }
            return response
        }
        else {
            return { "status": "erro", "message": "Preencha os dados obrigatorios" }
        }
    }

    async getTarefasByUserID(req, res) {
        const client = await db.connect();
        let sql = `SELECT data_criacao, descricao FROM tarefas WHERE id_usuario = ${req.id_usu}`
        let r
        try {
            r = await client.query(sql)
        }
        catch (e) { console.log(e); return { "status": "erro", "message": "consulte administrador da aplicação" } }
        if (r.rowCount != 0) {
            let data = new Array
            for (let i = 0; i < r.rowCount; i++) {
                data[i] = r.rows[i]
            }
            return { "status": "success", "data": data }
        }
        else {
            return { "status": "erro", "message": "nao foram encontrados registros" }
        }
    }
}

module.exports = new task()