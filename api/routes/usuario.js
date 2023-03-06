module.exports = app => {
  const tasks = require('../controllers/usuario')();

  //app.route('/api/usuario').get(controller.listCustomerWallets);

  app.route('/api/usuario', (req, res) => {
    console.log('ok')
    tasks.selectCustomers().then(data => res.json(data));
  });

  //app.route('/api/usuario').db.post(req,res)
}