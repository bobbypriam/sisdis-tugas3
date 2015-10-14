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

// Handle creating SOAP client
app.get('/tugas3/post', function (req, res) {
  var url = req.query.url;
  var message = req.query.message;
  if (url && message) {
    // Create SOAP client with WSDL from URL and call Hello(message)
    soap.createClient(url, function (err, client) {
      client.Hello(message, function (err, result) {
        res.send(result);
      });
    });
  }
});

// Show client page
app.get('/tugas3/klien', function (req, res) {
  var html = fs.readFileSync('client.html', 'utf8');
  res.send(html);
});

var server = http.createServer(app);
server.listen(8888);
soap.listen(server, '/tugas3/server', service, xml);
