module.exports = () => {
    const customerWalletsDB = require('../data/usuario.json');
    const controller = {};
    const db = require("../../config/db");
    
  
    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    (async function get () {
      console.log('Começou!');
    
      console.log('SELECT * FROM CLIENTES');
      const clientes = await db.selectCustomers();
      console.log(clientes);
      return clientes
    })();
    
    (async function post() {
      console.log('Começou!');
      
      console.log('INSERT INTO CLIENTES');
      const result = await db.insertCustomer({nome: "teste", login: "18", senha: "SP", email:"teste"});
      console.log(result.rowCount);
    
      console.log('SELECT * FROM CLIENTES');
      const clientes = await db.selectCustomers();
      console.log(clientes);
      return clientes
    })();

    return controller;
  }