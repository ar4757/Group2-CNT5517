/**
 The Relationships tab should present all relationships also through a filter similar to that of the services.
 providing features for the developer to edit the relationships and to select which ones to use
 in developing an application.
 Allow the user to bind  an unbound relationship by linking it to an appropriate service available
 under the Services’tab
 **/
import {Relationship_list, Services_list} from "../js/parseTweets"

//creating a prototype for bounded services
const boundedService = function(tweet){
    this.is_bounded = true;
    this.content = tweet;
}

//creating a prototype for unbounded services
const unboundedService = function(){
    this.is_bounded = false;
    this.bounded_service = null;
}

//creating a prototype for a relationship and two of its input services
const ServicesRelationship = function(relationship_tweet) {
    let first_service_name = relationship_tweet["Input1"];
    let matched_service1 = Services_list.filter(service => service["name"] == first_service_name)
    let second_service_name = relationship_tweet["Input2"];
    let matched_service2 = Services_list.filter(service => service["name"] == second_service_name)
    this.first_service = matched_service1.length == 1 ? new boundedService(matched_service1[0]) : new unboundedService();
    this.second_service = matched_service2.length == 1 ? new boundedService(matched_service2[0]) : new unboundedService();
    this.relationship = relationship_tweet["Type"];
};


//bind a unbounded service to a bounded service
const bindService = (unbounded_service, service_tweet) => {
    unbounded_service.is_bounded = true;
    unbounded_service.bounded_service = service_tweet;
};

//create ServicesRelationship instances for all relationship tweets
let servicesRelationship_list = Relationship_list.map(relationship => new ServicesRelationship(relationship));

/**
 * filter relationships that belong to certain things
 * @param   {list} a list of things id
 * @returns {list} a list of ServicesRelationship instances that will be displayed under Relationships tab
 */
const getFilteredServicesRelationship = (things_id_to_display) => {
    return servicesRelationship_list.filter(servicesRelationship => things_id_to_display[servicesRelationship.relationship["Thing ID"]] > -1);
};


