//Not yet working, but the goal is to load all of our group's tweets here
//We will use them to fill out our tabs with the data we receive
function load() {
	move();

	$.ajax({
 	type: 'GET',
 	url: 'http://10.254.254.64:3000/tweets',
 	success: function(response) {
  	console.log(response);
	//Use the response tweet array here (response contains an array of tweets, see js console);
	//displayThings(response);
	//displayServices(response);
	//displayRelationships(response);
	//displayApps(response);
	},
 	error: function(xhr, status, err) {
   	console.log(xhr.responseText);
 	}
	});
}

var i = 0;
function move() {
	if (i == 0) {
		i = 1;
		var elem = document.getElementById("bar");
		var width = 0;
		//Every 10 milliseconds update the bar
		var id = setInterval(frame, 10);
		function frame() {
		if (width >= 100) {
			clearInterval(id);
			i = 0;
			var loadingBlockade = document.getElementById("loadingBlockade");
			loadingBlockade.style.opacity = "0";
			loadingBlockade.style.zIndex = "-1";
		} else {
			//Increment by 0.05 every 10 milliseconds. This means the bar will fill after 20 seconds
			width += 0.05;
			elem.style.width = width + "%";
		}
		}
	}
}