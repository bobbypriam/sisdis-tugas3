var soap = require('soap');

soap.createClient('http://10.10.100.38/tugas3/wsdl', function (err, client) {
  client.Hello(['tes'], function (err, result) {
    console.log(result);
  });
});
