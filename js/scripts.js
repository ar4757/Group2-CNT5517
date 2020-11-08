//Not yet working, but the goal is to load all of our group's tweets here
//We will use them to fill out our tabs with the data we receive
function load() {
	const socket = new WebSocket('ws://10.254.0.2');

	socket.onopen(() => {
	  socket.send('Hello!');
	});

	socket.onmessage(data => {
	  console.log(data);
	});
}