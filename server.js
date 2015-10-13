var fs = require('fs');
var http = require('http');
var soap = require('soap');
var express = require('express');
var cors = require('cors');

// SOAP service
var xml = fs.readFileSync('spec.wsdl', 'utf8');
var service = {
  helloService: {
    helloPort: {
      Hello: function (message) {
        return "Halo " + message;
      }
    }
  }
};

// Express app
var app = express();
app.use(cors());

// WSDL specification
app.get('/tugas3/wsdl', function (req, res) {
  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

app.get('/tugas3/post', function (req, res) {
  var url = req.query.url;
  var message = req.query.message;
  if (url && message) {
    soap.createClient(url, function (err, client) {
      client.Hello(message, function (err, result) {
        res.json(result.body);
      });
    });
  }
});

app.get('/tugas3/client', function (req, res) {
  var html = fs.readFileSync('client.html', 'utf8');
  res.send(html);
});

var server = http.createServer(app);
server.listen(8888);
var soapServer = soap.listen(server, '/tugas3/server', service, xml);
