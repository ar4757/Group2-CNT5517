/**
 Put tweets to five lists: Identity_Entitity_list, Services_list,
 Identity_Thing_list, Identity_Language_list and Relationship_list
 **/
import {onload} from "../tabs/Relationships.js";
let Identity_Entitity_list = [];
let Services_list = [];
let Identity_Thing_list = [];
let Identity_Language_list = [];
let Relationship_list = [];

const parse = (tweets_arr) => {
	 let temp = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Entity' && tweets_arr.indexOf(tweet) == pos);
	 Identity_Entitity_list.push(...temp);
	 temp = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Service' && tweets_arr.indexOf(tweet) == pos);
	 Services_list.push(...temp);
	 temp  = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Thing' && tweets_arr.indexOf(tweet) == pos);
	 Identity_Thing_list.push(...temp);
	 temp  = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Language'&& tweets_arr.indexOf(tweet) == pos);
	 Identity_Language_list.push(...temp);
	 temp = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Relationships' && tweets_arr.indexOf(tweet) == pos);
	 Relationship_list.push(...temp);
	 onload();
}
export {
Identity_Entitity_list,
Services_list,
Identity_Thing_list,
Identity_Language_list,
Relationship_list,
parse
}



