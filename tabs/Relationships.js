/**
 The Relationships tab should present all relationships also through a filter similar to that of the services.
 providing features for the developer to edit the relationships and to select which ones to use
 in developing an application.
 Allow the user to bind  an unbound relationship by linking it to an appropriate service available
 under the Services’tab
 **/

import {Relationship_list} from "../js/parseTweets.js";
import {Services_list} from "../js/parseTweets.js";
//creating a prototype for bounded services
function service (serviceName, tweet = null, isBounded = false){
    this.is_bounded = isBounded;
    this.content = tweet;
    this.serviceName = serviceName;
}


//creating a prototype for a relationship and two of its input services
const ServicesRelationship = function(relationship_tweet) {
    console.log("new one1", Services_list);
    let first_service_name = relationship_tweet["Input1"];
    let matched_service1 = Services_list.find(service => service["Name"] == first_service_name)
    let second_service_name = relationship_tweet["Input2"];
    let matched_service2 = Services_list.find(service => service["Name"] == second_service_name)
    console.log("place1", matched_service1, matched_service2);
    this.first_service = matched_service1 != undefined ? new service(first_service_name, matched_service1, true) : new service(first_service_name);
    this.second_service = matched_service2 != undefined ? new service(second_service_name, matched_service2, true) : new service(second_service_name);
    this.relationship = relationship_tweet;
    this.type = "servicesRelationship";
};


//bind a unbounded service to a bounded service
const bindService = (unbounded_service, service_tweet) => {
    unbounded_service.is_bounded = true;
    unbounded_service.content = service_tweet;
    unbounded_service.name = service_tweet["name"];
};

//create ServicesRelationship instances for all relationship tweets
let servicesRelationship_list = Relationship_list.map(relationship => new ServicesRelationship(relationship));

/**
 * filter relationships that belong to certain things
 * @param   {list} a list of things id
 * @returns {list} a list of ServicesRelationship instances that will be displayed under Relationships tab
 */
const getFilteredServicesRelationship = (things_id_to_display = null) => {
    if(!things_id_to_display)
        return servicesRelationship_list;
    return servicesRelationship_list.filter(servicesRelationship => things_id_to_display[servicesRelationship.relationship["Thing ID"]] > -1);
};

export {getFilteredServicesRelationship};

