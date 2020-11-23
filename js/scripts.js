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
import {parse} from "./parseTweets.js";
import {onload} from "../tabs/Relationships.js";
function load() {
	move();
	$.ajax({
 	type: 'GET',
 	url: 'http://' + getHostIP() + ':3000/tweets',
 	success: function(response) {
 		parse(response);
 		onload();
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
	updateApps();
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
		//Set to 0 if doing frontend, non-tweet related code to skip the 40 second wait. Otherwise, 100
		if (width >= 100) {
			clearInterval(id);
			i = 0;
			var loadingBlockade = document.getElementById("loadingBlockade");
			loadingBlockade.style.opacity = "0";
			loadingBlockade.style.zIndex = "-1";
		} else {
			//Increment by 0.05 every 10 milliseconds. This means the bar will fill after 40 seconds
			width += 0.025;
			elem.style.width = width + "%";
		}
		}
	}
}

function getHostIP(){
	var ip = location.host;
	return ip;
}

function updateApps(){
	$.ajax({
		type: 'GET',
		url: 'http://' + getHostIP() + ':3000/getApps',
		success: function(response) {
			console.log(response);
			//First, clear existing apps
			var appList = document.getElementById("appList");
			while (appList.hasChildNodes()) {
				appList.removeChild(appList.lastChild);
			}
			//Array of app objects is in response
			for (const [key, value] of Object.entries(response)) {
				var appList = document.getElementById("appList");
				var entry = document.createElement('li');
				var paragraph = document.createElement('p');
				paragraph.className = "app-paragraph";
				var subparagraph1 = document.createElement('p');
				subparagraph1.innerHTML = key;
				subparagraph1.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph1);
				var subparagraph2 = document.createElement('p');
				subparagraph2.innerHTML = value;
				subparagraph2.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph2);
				var subparagraph3 = document.createElement('p');
				subparagraph3.innerHTML = "Not running";
				subparagraph3.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph3);
				entry.appendChild(paragraph);
				var buttonGroupDiv = document.createElement('div');
				buttonGroupDiv.className = "btn-group";
				buttonGroupDiv.id = "app-btn-group";
				var activateButton = document.createElement('button');
				activateButton.onclick = function() { activateApp(this); }
				activateButton.innerHTML = "Activate";
				activateButton.className = "button";
				buttonGroupDiv.appendChild(activateButton);
				var deleteButton = document.createElement('button');
				deleteButton.onclick = function() { deleteApp(this); }
				deleteButton.innerHTML = "Delete";
				deleteButton.className = "button";
				buttonGroupDiv.appendChild(deleteButton);
				entry.appendChild(buttonGroupDiv);
				entry.className = "list-entry";
				appList.appendChild(entry);
			}
	    },
		error: function(xhr, status, err) {
		  console.log(xhr.responseText);
		}
	   });
}
import {getThingsInfo} from "../tabs/Things.js";
import {getFilteredServices} from "../tabs/Services.js";
import {getFilteredServicesRelationship} from "../tabs/Relationships.js";
import {putRelationship, putService, recipe_list}  from "../tabs/recipe.js";
function updateServices(){
	//will need to parse the Services_list object to get needed info.
	var elem = document.getElementById("Services");
	var services_display_html = "<h4>Filter based on:</h4>"
	var things_id_to_display = null;
	//filter based on things
	const things_info_json = getThingsInfo();
	Object.keys(things_info_json).forEach(thing_name => {
		console.log("here1");
		services_display_html += '<input type="checkbox" id="'+ thing_name +'" checked="true">' + 
		'<label for="'+ thing_name + '">' + thing_name + '</label>';
	});
	services_display_html += '<br><br><h4>Services Available:</h4>';
	const FilteredServices_list = getFilteredServices(things_id_to_display);
	FilteredServices_list.forEach(service => {
		services_display_html += '<div class="draggable" draggable="true" ondragstart="drag(event)">' +service["Name"] + '</div>' + '</p>' + "belong to " + service["Thing ID"] + '</p>';
	});
	elem.innerHTML = services_display_html;
}

function updateThings(){
	
	var elem = document.getElementById("Things");
	var things_display_html = ""
	const things_info_json = getThingsInfo();
	Object.keys(things_info_json).forEach(thing_name => {
		console.log("here1");
		things_display_html += '<p class="thing_info">' +thing_name + '</p>' + '<p class="thing_info">' +
		'description:' + things_info_json[thing_name] + '</p>';
	});

	elem.innerHTML = things_display_html;
	console.log("update things", things_display_html);
}

function updateRelationships(){
	var elem = document.getElementById("Relationships");
	var relationship_display_html = "<h4>Filter based on:</h4>";
	var things_id_to_display = null;

	//filter based on things
	const things_info_json = getThingsInfo();
	Object.keys(things_info_json).forEach(thing_name => {
		console.log("here1");
		relationship_display_html += '<input type="checkbox" id="'+ thing_name +'" checked="true">' + 
		'<label for="'+ thing_name + '">' + thing_name + '</label>';
	});
	relationship_display_html += '<br><br><h4>Relationships Available:</h4>';

	// drop down services
	const FilteredServices_list = getFilteredServices(things_id_to_display);

	const filteredServicesRelationship_list = getFilteredServicesRelationship(things_id_to_display);
	filteredServicesRelationship_list.forEach(servicesRelationship => {
		relationship_display_html += '<div class="draggable" draggable="true" ondragstart="drag(event)">' +servicesRelationship.relationship["Name"] + '</div>';
		let is_first_bounded = servicesRelationship.first_service.is_bounded ? "bounded" : "unbounded";
		let is_second_bounded = servicesRelationship.second_service.is_bounded ? "bounded" : "unbounded";
		relationship_display_html += '<p>' + "has " + servicesRelationship.first_service.serviceName + " " + is_first_bounded + " service" + '</p>';
		relationship_display_html += '<p>' + "has " + servicesRelationship.second_service.serviceName +  " " + is_second_bounded +  " service" + '</p>';
	});
	elem.innerHTML = relationship_display_html;
}

function putServiceToRecipe(service_name) {
	console.log(service_name);
	let service = getFilteredServices().find(service => service["Name"] == service_name);
	putService(service);
}

function putRelationshipToRecipe(relationship_name) {
	console.log(relationship_name);
	let serviceRelationship = getFilteredServicesRelationship().find(servicesRelationship => servicesRelationship.relationship["Name"] == relationship_name);
	putRelationship(serviceRelationship);
}
function updateRecipe(){
	//this function will require the drag and drop feature.

}

function changeWorkingDirectory(){
	var directoryText = document.getElementById("directoryText");
	var formData = {"directoryText": directoryText.value};
	$.ajax({
		type: 'POST',
		url: 'http://' + getHostIP() + ':3000/changeDirectory',
		data : formData,
		success: function(response) {
			console.log(response);
			updateApps();
		},
		error: function(xhr, status, err) {
			console.log(xhr.responseText);
		}
	});
}

function finalizeRecipe(){
	const showPopup = () => {
		var popup = document.querySelector('.popupRecipe');
		popup.style.visibility = 'visible';
  	};

  	showPopup();
}

function nameRecipe(){
	//check that this name is valid
	var recipename = document.getElementById("recipeText").value;
	finishFinalizeRecipe(recipename);
	//else {
	//	console.log("Invalid filename" + filename.value);
	//}
}

function finishFinalizeRecipe(recipename){
	var key = recipename;

	//const recipeContent = document.querySelector('.ide-text');
	const recipeContent = "Call service 1";
	var value = recipeContent;
	var recipeList = document.getElementById("recipeList");
	var entry = document.createElement('li');
	var paragraph = document.createElement('p');
	paragraph.className = "app-paragraph";
	var subparagraph1 = document.createElement('p');
	subparagraph1.innerHTML = key;
	subparagraph1.className = "app-sub-paragraph";
	paragraph.appendChild(subparagraph1);
	var subparagraph2 = document.createElement('p');
	subparagraph2.innerHTML = value;
	subparagraph2.className = "app-sub-paragraph";
	paragraph.appendChild(subparagraph2);
	var subparagraph3 = document.createElement('p');
	subparagraph3.innerHTML = "Not running";
	subparagraph3.className = "app-sub-paragraph";
	paragraph.appendChild(subparagraph3);
	entry.appendChild(paragraph);
	var buttonGroupDiv = document.createElement('div');
	buttonGroupDiv.className = "btn-group";
	buttonGroupDiv.id = "app-btn-group";
	var saveButton = document.createElement('button');
	saveButton.onclick = function() { saveNewApp() };
	saveButton.innerHTML = "Save";
	saveButton.className = "button";
	buttonGroupDiv.appendChild(saveButton);
	var activateButton = document.createElement('button');
	activateButton.onclick = function() { activateApp(this); }
	activateButton.innerHTML = "Activate";
	activateButton.className = "button";
	buttonGroupDiv.appendChild(activateButton);
	var deleteButton = document.createElement('button');
	deleteButton.onclick = function() { deleteApp(this); }
	deleteButton.innerHTML = "Delete";
	deleteButton.className = "button";
	buttonGroupDiv.appendChild(deleteButton);
	entry.appendChild(buttonGroupDiv);
	entry.className = "list-entry";
	recipeList.appendChild(entry);

	const hidePopup = () => {
		var popup = document.querySelector('.popupRecipe');
		popup.style.visibility = 'hidden';
  };

  hidePopup();
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
	const downloadToFile = (content, filename, contentType) => {
		var formData = {"content": content, "filename": filename, "contentType": contentType};
		$.ajax({
			type: 'POST',
			url: 'http://' + getHostIP() + ':3000/saveApp',
			data : formData,
			success: function(response) {
				console.log(response);
				//Add new app to list
				var key = filename;
				var value = content;
				var appList = document.getElementById("appList");
				var entry = document.createElement('li');
				var paragraph = document.createElement('p');
				paragraph.className = "app-paragraph";
				var subparagraph1 = document.createElement('p');
				subparagraph1.innerHTML = key;
				subparagraph1.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph1);
				var subparagraph2 = document.createElement('p');
				subparagraph2.innerHTML = value;
				subparagraph2.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph2);
				var subparagraph3 = document.createElement('p');
				subparagraph3.innerHTML = "Not running";
				subparagraph3.className = "app-sub-paragraph";
				paragraph.appendChild(subparagraph3);
				entry.appendChild(paragraph);
				var buttonGroupDiv = document.createElement('div');
				buttonGroupDiv.className = "btn-group";
				buttonGroupDiv.id = "app-btn-group";
				var activateButton = document.createElement('button');
				activateButton.onclick = function() { activateApp(this); }
				activateButton.innerHTML = "Activate";
				activateButton.className = "button";
				buttonGroupDiv.appendChild(activateButton);
				var deleteButton = document.createElement('button');
				deleteButton.onclick = function() { deleteApp(this); }
				deleteButton.innerHTML = "Delete";
				deleteButton.className = "button";
				buttonGroupDiv.appendChild(deleteButton);
				entry.appendChild(buttonGroupDiv);
				entry.className = "list-entry";
				appList.appendChild(entry);
			},
			error: function(xhr, status, err) {
				console.log(xhr.responseText);
			}
		});
	};

	//const appContent = document.querySelector('.ide-text');
	const appContent = "Call service 1";
	downloadToFile(appContent, filename.value, 'text/plain');

	const hidePopup = () => {
  		var popup = document.querySelector('.popup');
  		popup.style.visibility = 'hidden';
	};

	hidePopup();
}

function deleteApp(button){
	//remove app from list of working apps.
	var filename = button.parentNode.parentNode.getElementsByClassName("app-paragraph")[0].getElementsByClassName("app-sub-paragraph")[0].innerHTML;
	console.log(filename);
	var formData = {"filename": filename};
	$.ajax({
		type: 'POST',
		url: 'http://' + getHostIP() + ':3000/deleteApp',
		data : formData,
		success: function(response) {
		 console.log(response);
		 //remove from list
		 stopApp(button);
		 button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
	   },
		error: function(xhr, status, err) {
		  console.log(xhr.responseText);
		}
	   });
}

function loadApp(){
	//load app from list with given directory
}

var runTimeIntervals = {};

function activateApp(button){
	//activate the currently selected app

	//display as running
	var runningDisplay = button.parentNode.parentNode.getElementsByClassName('app-sub-paragraph')[2];
	var runTime = 0;
	var runTimeInterval = setInterval(function(){ 
		runningDisplay.innerHTML = "Running for " + runTime + " seconds";
		runTime += 1;
	}, 1000);
	var key = button.parentNode.parentNode.getElementsByClassName('app-sub-paragraph')[0].innerHTML;
	runTimeIntervals[key] = runTimeInterval;

	//App has been running for 5 minutes
	setTimeout(function(){
		if (runTime >= 300) {
			runningDisplay.innerHTML = "App ended due to running over 5 minutes";
		}
		else {
			runningDisplay.innerHTML = "Not running";
		}
		clearInterval(runTimeInterval);
		//toggle button to be an activate button once again
		button.onclick = function() { activateApp(this); }
		button.innerHTML = "Activate";
	}, 300000);

	//toggle button to be a stop button
	button.onclick = function() { stopApp(this); }
	button.innerHTML = "Stop";
}

function stopApp(button){
	//stop the currently selected app

	//display as not running
	var key = button.parentNode.parentNode.getElementsByClassName('app-sub-paragraph')[0].innerHTML;
	clearInterval(runTimeIntervals[key]);
	var runningDisplay = button.parentNode.parentNode.getElementsByClassName('app-sub-paragraph')[2];
	runningDisplay.innerHTML = "Not running";

	//toggle button to be an activate button
	button.onclick = function() { activateApp(this); }
	button.innerHTML = "Activate";
}

window.move = move;
window.updateApps = updateApps;
window.updateServices = updateServices;
window.updateThings = updateThings;
window.updateRelationships = updateRelationships;
window.updateRecipe = updateRecipe;
window.changeWorkingDirectory = changeWorkingDirectory;
window.finalizeRecipe = finalizeRecipe;
window.saveNewApp = saveNewApp;
window.finishSaveNewApp = finishSaveNewApp;
window.deleteApp = deleteApp;
window.loadApp = loadApp;
window.activateApp = activateApp;
window.stopApp = stopApp;
window.putServiceToRecipe = putServiceToRecipe;
window.putRelationshipToRecipe = putRelationshipToRecipe;
window.nameFile = nameFile;
window.nameRecipe = nameRecipe;
export {load}
