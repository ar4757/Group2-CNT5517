var net = require('net');

var client = new net.Socket();
client.connect(6668, '10.254.254.64', function() {
		console.log('Connected');
		testRequestService();
	}
);

client.on('data', function(data) {
    var buffer = Buffer.alloc(2048);
    console.log(buffer.toString('utf8', 0, data));
    var json = JSON.parse(data)
    console.log(json);
    console.log(json['Service Result']);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function(err) {
	console.error('Connection error: ' + err);
	console.error(new Error().stack);
});

function testRequestService() {
	var message = "{ \"Tweet Type\" : \"Service call\", \"Thing ID\" : \"raspberry_pi_ar4757\", \"Space ID\" : \"MySmartSpace_ar4757\", \"Service Name\" : \"Digital_Sound\", \"Service Inputs\" : \"()\" }";
	client.write(message);
}