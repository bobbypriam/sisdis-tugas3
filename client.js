var soap = require('soap');

soap.createClient('http://localhost:8888/tugas3/wsdl', function (err, client) {
  client.helloService.helloPort.Hello({ helloInputPart: 'tes'}, function (err, result) {
    console.log(result);
  });
});
