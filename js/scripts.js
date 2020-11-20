//Not yet working, but the goal is to load all of our group's tweets here
//We will use them to fill out our tabs with the data we receive

/*What remains to be done:
1. Recipe tab should open some kind of text area, that allows the user to drop 
services and relationships into the current app.
2. Implement a local directory system that contains the files for an app.
3. Possibly move the app listing to a tab, and resize the text editor size.
4. Allow the textview window to change between files in the same directory.
5. Link buttons with their functions, this is done for some buttons already.
6. Add clear operation for the recipes tab.
7. Add images?

*/


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
		//Set to 0 if doing frontend, non-tweet related code to skip the 40 second wait
		if (width >= 100) {
			clearInterval(id);
			i = 0;
			var loadingBlockade = document.getElementById("loadingBlockade");
			loadingBlockade.style.opacity = "0";
			loadingBlockade.style.zIndex = "-1";
		} else {
			//Increment by 0.05 every 10 milliseconds. This means the bar will fill after 20 seconds
			width += 0.025;
			elem.style.width = width + "%";
		}
		}
	}
}

function updateServices(){
	//will need to parse the Services_list object to get needed info.
	var elem = getElementById("services-list");
	elem.innerHtml = vals.Services_list.to_String();
}

function updateThings(){
	var elem = getElementById("things-list");
	elem.innerHtml = vals.Identity_Thing_list.to_String();
}

function updateRelationships(){
	var elem = getElementById("relationships-list");
	elem.innerHtml =vals.Relationship_list.to_String();
}

function updateRecipe(){
	//this function will require the drag and drop feature.

}

function changeWorkingDirectory(){
	var elems = getElementsByClassName("sub");
	//derefence array into object
	elems = elems[0];

	//set working directory (if possible) to the path in elems.text
	
}

function saveNewApp(){
	//request name for app
	//popup here
	const showPopup = () => {
  		var popup = document.querySelector('.popup');
  		popup.style.visibility = 'visible';
	};

	showPopup();
}

function nameFile(){
	//check that this name is valid
	var filename = document.getElementById("fileText");
	finishSaveNewApp(filename);
	//else {
	//	console.log("Invalid filename" + filename.value);
	//}
}

function finishSaveNewApp(filename){
	//save contents of textare(div = "ide-text") to appropriate file type in working dir
	const downloadToFile = (content, filename, contentType) => {
  		const a = document.createElement('a');
  		const file = new Blob([content], {type: contentType});
  
  		a.href= URL.createObjectURL(file);
  		a.download = filename;
  		a.click();

		URL.revokeObjectURL(a.href);
	};

    const textArea = document.querySelector('.ide-text');
	downloadToFile(textArea.value, filename.value, 'text/plain');

	const hidePopup = () => {
  		var popup = document.querySelector('.popup');
  		popup.style.visibility = 'hidden';
	};

	hidePopup();
}

function deleteApp(){
	//remove app from list of working apps.
}

function loadApp(){
	//load app from list with given directory
}

function activateApp(){
	//activate the currently selected app
}

