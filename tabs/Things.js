/**
 The Things tab includes info about each thing
 **/
import {Identity_Thing_list} from "../js/parseTweets";

/**
 * get info for all things
 * @param   {?}    ?
 * @returns {?}    info of all things
 */

const getThingsInfo = (things_info_json) => {
    Identity_Thing_list.forEach(thing => {
        //if(thing["Space ID"] == "G2") {
            things_info_json[thing["Thing ID"]] = "xxxx";
        //}
    });
};
export {getThingsInfo}