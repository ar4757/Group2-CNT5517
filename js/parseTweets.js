/**
 Put tweets to five lists: Identity_Entitity_list, Services_list,
 Identity_Thing_list, Identity_Language_list and Relationship_list
 **/
 
import {dummy_tweets as tweets_arr} from "../unit_test/dummyTweets.js";
const Identity_Entitity_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Entity' && tweets_arr.indexOf(tweet) == pos);
const Services_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Service' && tweets_arr.indexOf(tweet) == pos);
const Identity_Thing_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Thing' && tweets_arr.indexOf(tweet) == pos);
const Identity_Language_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Language'&& tweets_arr.indexOf(tweet) == pos);
const Relationship_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Relationships' && tweets_arr.indexOf(tweet) == pos);

export {
Identity_Entitity_list,
Services_list,
Identity_Thing_list,
Identity_Language_list,
Relationship_list
}



