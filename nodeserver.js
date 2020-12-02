const PORT = 1235;
const MULTICAST_ADDR = "232.1.1.1";

const fs = require('fs')
const path = require('path')
const dgram = require("dgram");
const process = require("process");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

const runApp = require('./callService.js').runApp;

app.post('/callServices', (req, res) => {
	const app = req.body;
	runApp(app);
	res.send('okay');
});

app.get('/tweets', function(req, res) {
	var tweet_array = [];

	const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

	socket.bind(PORT);

	socket.on("listening", function() {
    		socket.addMembership(MULTICAST_ADDR);
    	const address = socket.address();
    	console.log(
        	`UDP socket listening on ${address.address}:${address.port} pid: ${
            	process.pid
        	}`
    	);
	});

	socket.on("message", function(message, rinfo) {
		//Replace invalid json from atlas with corrected escaped quotes
        var messageFormatted = message.toString().replace(/\[[^\]]*\]/g, function(match) {
            return match.replace(/([^\\])"/g, "$1\\\"");
        });
		console.info(`Tweet from: ${rinfo.address}:${rinfo.port} - ${messageFormatted}`);
		let tweet = JSON.parse(messageFormatted);
		tweet["IP"] = rinfo.address;
		tweet["port"] = rinfo.port;
		tweet_array.push(tweet);
	});

	//Wait 60 seconds to load tweets
	const tweetFetchTime = 60000;
	setTimeout(function() {
		res.json(tweet_array);
	}, tweetFetchTime);
});

const port = 3000;

app.listen(port, () => {
	console.log(`NodeJS Express app is listening on port ${port}`);
});

var dirname = 'apps/'

app.get('/getApps', function(req, res) {
	if (!fs.existsSync(dirname)){
		fs.mkdirSync(dirname);
	}

	var data = {};
	fs.readdir(dirname, function(err, filenames) {
		if (err) {
		  console.log(err);
		  return;
		}
		filenames.forEach(function(filename) {
		  fs.readFile(dirname + filename, 'utf-8', function(err, content) {
			if (err) {
			  console.log(err);
			  return;
			}
			else {
				console.log("Found file " + filename);
				console.log("file content is", JSON.parse(JSON.parse(content)));
				//It seems that when saving app to the file, it over stringfys the object. so here we use double Json.Parse
				data[filename] = JSON.parse(JSON.parse(content));
			}
		  });
		});
	});

	//0.5 seconds
	const fileFetchTime = 500;
	setTimeout(function() {
		console.log(data);
		//console.log(JSON.parse(data));
		res.json(data);
	}, fileFetchTime);
});

app.post('/saveApp', function(req, res) {

	response = {
		filename : req.body.filename,
		data : req.body.content,
		encoding: req.body.contentType
	};

	fs.writeFile(dirname + response.filename, JSON.stringify(response.data), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("File saved successfully!");
	})
	
	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred 
	//using the server
	console.log(response);
	
	//convert the response in JSON format
	res.end(JSON.stringify(response));
});

app.post('/deleteApp', function(req, res) {

	response = {
		filename : req.body.filename,
	};

	fs.unlink(dirname + response.filename, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("File deleted successfully!");
	})
	
	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred 
	//using the server
	console.log(response);
	
	//convert the response in JSON format
	res.end(JSON.stringify(response));
});

app.post('/changeDirectory', function(req, res) {
	response = {
		directory : req.body.directoryText
	};

	dirname = response.directory;
	
	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred 
	//using the server
	console.log(response);
	
	//convert the response in JSON format
	res.end(JSON.stringify(response));
});

