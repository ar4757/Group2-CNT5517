/**
 Services tab contains a filter to show services of all or a subset of the things
 (that is shows the union of services belonging to 4, 3, 2 or 1 things).
 Each service presented under this tab should contain an identity of its owner thing.
 **/

import {Services_list} from "../js/parseTweets.js";




/**
 * filter services that belong to certain things
 * @param   {list} a list of things id
 * @returns {list} a list of services that will be displayed under service tab
 */
let filtered_services_list = Services_list;


const getFilteredServices = (things_id_to_display) => {

    console.log("things_id_to_display", things_id_to_display);
    //remove duplicate tweets
    let obj = {};

    for ( let i=0, len = filtered_services_list.length; i < len; i++ )
        obj[filtered_services_list[i]['Name']] = filtered_services_list[i];

    filtered_services_list = []
    for ( let key in obj )
        filtered_services_list.push(obj[key]);

    //assign service with default input
    filtered_services_list.forEach(service => {
        let firstComma = service.API.indexOf("[");
        let inputType = service.API.substr(firstComma + 1, service.API.indexOf("]") - firstComma - 1);
        if(inputType != "NULL") {
            service["Has Input"] = true;
            service["Input"] = 1;
            //console.log("has input", inputType);
        }
        else {
            service["Has Input"] = false;
            service["Input"] = "";
        }
    });

    //if(things_id_to_display == null) {
        //console.log("filtered list", filtered_services_list);
       // return filtered_services_list;
    //}

    filtered_services_list = filtered_services_list.filter(service => things_id_to_display[service["Thing ID"]] != -1);

    return filtered_services_list;
};

export {getFilteredServices};
