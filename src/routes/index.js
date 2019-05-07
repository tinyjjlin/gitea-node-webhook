// routes/index.js
const webhook = require('../webhook')
const script = require('../script-config')
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('Hello world');
  });
  app.post('/nodeproxyhook', function (req, res) {
    let header = req.headers;
    let body = req.body
    console.log('header:\n' + JSON.stringify(header))
    console.log('body:\n' + JSON.stringify(body))
    let execScript = script['nodeproxy']
    webhook({ header, body, execScript}, function (code,msg) {
      if (!code) {
        res.status(500).send(msg);
      } else {
        res.end(msg);
      }
    });

  });

};