//import {filteredServicesRelationship_list} from "./Relationships.js"
//import {filteredServices_list} from "./Services.js"

let recipe_list = []


function putRelationship(param){
    if(param.type == "servicesRelationship") {
        if(!param.first_service.is_bounded || ! param.second_service.is_bounded) {
            console.error("there is unbounded service in this relationship");
            return false;
        }
        recipe_list.push(param);
        return true;
    }
    return false;

}

function putService(service) {
    recipe_list.push(service);
}


export {
recipe_list,
    putRelationship,
putService
}
