//Not yet working, but the goal is to load all of our group's tweets here
//We will use them to fill out our tabs with the data we receive
function load() {
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
