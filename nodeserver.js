const PORT = 1235;
const MULTICAST_ADDR = "232.1.1.1";

const dgram = require("dgram");
const process = require("process");
var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());

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
		var messageFormatted = message.toString().replace(/\["([A-z0-9]*)"/, "[\\\"$1\\\"");
		messageFormatted = messageFormatted.replace(/\("([A-z0-9]*)"/, "(\\\"$1\\\"");
		console.info(`Tweet from: ${rinfo.address}:${rinfo.port} - ${messageFormatted}`);
	tweet_array.push(JSON.parse(messageFormatted));
	});

	//Wait 40 seconds to load tweets
	const tweetFetchTime = 40000;
	setTimeout(function() {
		res.json(tweet_array);
	}, tweetFetchTime);
});

const port = 3000;

app.listen(port, () => {
	console.log(`NodeJS Express app is listening on port ${port}`);
});
