/**
 The Things tab includes info about each thing
 **/
import {Identity_Thing_list} from "../js/parseTweets.js";

/**
 * get info for all things
 * @param   {?}    ?
 * @returns {?}    info of all things
 */
let things_info_json = {};
const getThingsInfo = () => {
    Identity_Thing_list.forEach(thing => {
        //if(thing["Space ID"] == "G2") {
            things_info_json[thing["Thing ID"]] = "xxxx";
            console.log(thing);
        //}
    });
    return things_info_json;
};
export {getThingsInfo}
