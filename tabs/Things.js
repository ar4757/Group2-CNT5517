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
        if(thing["Space ID"].indexOf("G2") != -1) {
            let description = "";
            description += "Thing with Name " +thing["Name"] + " and with ID " + thing["Thing ID"] +
                    " is from space " + thing["Space ID"] + ": " + thing["Description"];

            things_info_json[thing["Thing ID"]] = description;
            //console.log(thing);
        }
    });
    return things_info_json;
};
export {getThingsInfo}
