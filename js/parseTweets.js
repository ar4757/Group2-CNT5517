/**
 Put tweets to five lists: Identity_Entitity_list, Services_list,
 Identity_Thing_list, Identity_Language_list and Relationship_list
 **/
const tweets_arr = require("../unit_test/dummyTweets").dummy_tweets;
const Identity_Entitity_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Entity' && tweets_arr.indexOf(tweet) == pos);
const Services_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Service' && tweets_arr.indexOf(tweet) == pos);
const Identity_Thing_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Thing' && tweets_arr.indexOf(tweet) == pos);
const Identity_Language_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Identity_Language'&& tweets_arr.indexOf(tweet) == pos);
const Relationship_list = tweets_arr.filter((tweet, pos) => tweet['Tweet Type'] == 'Relationship' && tweets_arr.indexOf(tweet) == pos);

exports.Identity_Entitity_list = Identity_Entitity_list;
exports.Services_list = Services_list;
exports.Identity_Thing_list = Identity_Thing_list;
exports.Identity_Language_list = Identity_Language_list;
exports.Relationship_list = Relationship_list;



