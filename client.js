var soap = require('soap');

function handleClient(err, client) {
  client.on('request', function (request) {
    console.log(request);
  });
  client.Hello('a', function (err, result) {
    console.log(result);
  });
}

soap.createClient('http://10.10.100.38/tugas3/wsdl', handleClient);
soap.createClient('http://10.10.100.61/tugas3/spesifikasi.wsdl', handleClient);
soap.createClient('http://10.10.100.41/tugas3/dalilah.wsdl', handleClient);
