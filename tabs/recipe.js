import {filteredServicesRelationship_list} from "./Relationships"
import {filteredServices_list} from "./Services"

let recipe_list = []

let current_func = checkIsRelationship;

function checkIsRelationship(param){
    if(param.type == "servicesRelationship") {
        recipe_list.push(param);
        checkIsFirstService.serviceRelationship = param;
        return checkIsFirstService;
    }
    else {
        console.log("require a relationship here");
    }

}

function checkIsFirstService(serviceName) {
    if(checkIsFirstService.serviceRelationship.first_service.name == serviceName) {
        return checkIsSecondService;
    }
    else {
        console.log("First service does not match");
    }

}

function checkIsSecondService(serviceName) {
    if(checkIsFirstService.serviceRelationship.first_service.name == serviceName) {
        return checkIsRelationship;
    }
    else {
        console.log("Second service does not match");
    }

}


const putNext = (param) => {
    current_func = current_func(param);
};

export {
    recipe_list
}
