const app = require('./config/express.js')();
//const port = app.get('port');
const port = 8080;
const db = require("../API_Rotina/config/db");
// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

/* (async () => {
  console.log('Começou!');

  console.log('SELECT * FROM CLIENTES');
  const clientes = await db.selectCustomers();
  console.log(clientes);
})();

(async () => {
  console.log('Começou!');
  
  console.log('INSERT INTO CLIENTES');
  const result = await db.insertCustomer({nome: "teste", login: "18", senha: "SP", email:"teste"});
  console.log(result.rowCount);

  console.log('SELECT * FROM CLIENTES');
  const clientes = await db.selectCustomers();
  console.log(clientes);
})(); */

