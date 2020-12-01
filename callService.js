var net = require('net');

let clients_pool = {};

const writeMessage = (service) => {
	let ip_addr = service["IP"];
	let message = makeMessage(service["Thing ID"], service["Space ID"], service["Name"], service["Input"]);
	let client = null;
	if(clients_pool[ip_addr]) {
		client = clients_pool[ip_addr];
		clients_pool[ip_addr] = client;
	}
	else {
		client =  new net.Socket();
		client.connect(6668, ip_addr, function () {
				console.log('Connected');
			}
		);
	}
	client.write(message);
	return client;
};


const relationshipDelegator = (relationship_type, previous_result, isInSameSpace, delegatee, param1, param2) => {
	switch (relationship_type) {
		case "control":
			if(previous_result) {
				param1["Input"] = previous_result;
				delegatee(param1, param2);
			}
			break
		case "drive":
			param1["Input"] = previous_result;
			delegatee(param1, param2);
			break
		case "support":
			if(previous_result) {
				param1["Input"] = previous_result;
				delegatee(param1, param2);
			}
			break
		case "extend":
			delegatee(param1, param2);
			break
		case "contest":
			delegatee(param1, param2);
			break
		case "interfere":
			if(!isInSameSpace)
				delegatee(param1, param2);
			break
		default:
			console.error("invalid relationship type");
	}
};

const createClientForOneService = (service, input = null) =>
{
	if(input)
		service["Input"] = input;
	let client = writeMessage(service);

	client.on('data', function (data) {
		let buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		let json = JSON.parse(data)
		let result = parseInt(json['Service Result']);
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

const createClientForOneRelationship = (relationship) =>
{
	let relationship_type = relationship.relationship["Type"];
	let first_service = relationship.first_service.content;
	let second_service = relationship.second_service.content;
	let isInSameSpace = first_service["Space ID"] ==  second_service["Space ID"];
	let client = writeMessage(first_service);
	console.log("relatinship first service", first_service);
	client.on('data', function (data) {
		var buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		var json = JSON.parse(data)
		let result = parseInt(json['Service Result']);
		console.log("relatinship second service", second_service);
		relationshipDelegator(relationship_type, result, isInSameSpace, createClientForOneService, second_service, null);

		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

const createClientForIfServiceThenService = (if_service, then_service) =>
{
	let client = writeMessage(if_service);
	client.on('data', function (data) {
		let buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		let json = JSON.parse(data)
		let result = parseInt(json['Service Result']);
		if(result) {
			createClientForOneService(then_service, null);
		}
		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

const createClientForIfServiceThenRelationship = (if_service, then_relationship) =>
{
	let client = writeMessage(if_service);
	client.on('data', function (data) {
		var buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		var json = JSON.parse(data)
		let result = parseInt(json['Service Result']);
		//console.log("IfServiceThenRelationship", result, typeof result);
		if(result){
			createClientForOneRelationship(then_relationship);
		}

		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

const createClientForIfRelationshipThenService = (if_relationship, then_service) =>
{

	let relationship_type = if_relationship.relationship["Type"];
	let first_service = if_relationship.first_service.content;
	let second_service = if_relationship.second_service.content;
	let isInSameSpace = if_relationship["Space ID"] ==  if_relationship["Space ID"];
	let client = writeMessage(first_service);

	client.on('data', function (data) {
		let buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		let json = JSON.parse(data)
		let result = parseInt(json['Service Result']);
		relationshipDelegator(relationship_type, result, isInSameSpace, createClientForIfServiceThenService, second_service, then_service);

		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

const createClientForIfRelationshipThenRelationship = (if_relationship, then_relationship) =>
{

	let relationship_type = if_relationship.relationship["Type"];
	let first_service = if_relationship.first_service.content;
	let second_service = if_relationship.second_service.content;
	let isInSameSpace = first_service["Space ID"] ==  second_service["Space ID"];
	let client = writeMessage(first_service);

	client.on('data', function (data) {
		let buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		let json = JSON.parse(data)
		let result = parseInt(json['Service Result'])
		//console.log("createClientForIfRelationshipThenRelationship type", relationship_type);
		relationshipDelegator(relationship_type, result, isInSameSpace, createClientForIfServiceThenRelationship, second_service, then_relationship);

		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};

/*
const createClient = (ip_addr, message, relationship_type = null, secondIp_addr = null, secondService = null) =>
{

	writeMessage(ip_addr, message);

	client.on('data', function (data) {
		var buffer = Buffer.alloc(2048);
		console.log(buffer.toString('utf8', 0, data));
		var json = JSON.parse(data)
		let result = json['Service Result'];
		if(relationship_type != null) {
			switch (relationship_type) {
				case "control":
					if(result)
						createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], result));
					break
				case "drive":
					createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], result));
					break
				case "support":
					if(result)
						createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], result));
					break
				case "extend":
					createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], ""));
					break
				case "contest":
					createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], ""));
					break
				case "interfere":
					if(message["Space ID"] != secondService["Space ID"])
						createClient(secondIp_addr, makeMessage(secondService["Thing ID"], secondService["Space ID"], secondService["Name"], ""));
					break
				default:
					console.error("invalid relationship type");
			}

		}
		//client.destroy(); // kill client after server's response
	});

	client.on('close', function () {
		console.log('Connection closed');
	});

	client.on('error', function (err) {
		console.error('Connection error: ' + err);
		console.error(new Error().stack);
	});
};
*/
function makeMessage(thing_id, space_id, service_name, service_input) {
	return "{ \"Tweet Type\" : \"Service call\", \"Thing ID\" : \"" + thing_id + "\", \"Space ID\" :\"" + space_id +"\", \"Service Name\" :\""+ service_name + "\", \"Service Inputs\" :\"(" + service_input + ")\" }";
}
function testRequestService() {
	var message = "{ \"Tweet Type\" : \"Service call\", \"Thing ID\" : \"raspberry_pi_ar4757\", \"Space ID\" : \"MySmartSpace_ar4757\", \"Service Name\" : \"Digital_Sound\", \"Service Inputs\" : \"()\" }";
	client.write(message);
}



const runApp = (app)=> {
	app.forEach(param => {
		if(param.type == "servicesRelationship")
			createClientForOneRelationship(param);
		else if(param.type == "condEval") {
			//console.log("is condeval*****************",param.condObj.type, param.evalObj.type);
			if(param.condObj.type == "servicesRelationship" && param.evalObj.type == "servicesRelationship")
				createClientForIfRelationshipThenRelationship(param.condObj, param.evalObj);
			else if(param.condObj.type == "servicesRelationship")
				createClientForIfRelationshipThenService(param.condObj, param.evalObj);
			else if(param.evalObj.type == "servicesRelationship")
				createClientForIfServiceThenRelationship(param.condObj, param.evalObj);
			else
				createClientForIfServiceThenService(param.condObj, param.evalObj);
		}
		else
			createClientForOneService(param);
	});
};

exports.runApp = runApp;
