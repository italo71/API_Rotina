module.exports = app => {
    const controller = require('../controllers/usuario')();
  
    app.route('/api/usuario').get(controller.listCustomerWallets);

    app.route('/api/usuario').post(controller.listCustomerWallets);
  }