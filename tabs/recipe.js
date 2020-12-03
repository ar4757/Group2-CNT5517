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
        //console.log("putRelationship", recipe_list);
        return true;
    }
    return false;

}

function putService(service) {
    recipe_list.push(service);
    //console.log("putService",recipe_list);
}

//prototype for a cond_eval
const condEval = function(condObj, evalObj) {
    this.condObj = condObj;
    this.evalObj = evalObj;
    this.type = "condEval";
};

function putCondEval(cond_eval) {
    recipe_list.push(cond_eval);
    console.log("putCondEval", recipe_list);
}



export {
    recipe_list,
    putRelationship,
    putService,
    putCondEval,
    condEval
}
