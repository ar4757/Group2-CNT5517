"use strict";
const getThingsInfo =  require("../tabs/Things").getThingsInfo;
const getFilteredServices =  require("../tabs/Services").getFilteredServices;
const getFilteredServicesRelationship =  require("../tabs/Relationships").getFilteredServicesRelationship;
//test Things.js
(() => {
    let thing_list = [];
    getThingsInfo(thing_list);
    console.log(thing_list);
})();

//test Service.js
(() => {
    console.log(getFilteredServices());
})();

//test Relationships.js
(() => {
    console.log(getFilteredServicesRelationship());
})();