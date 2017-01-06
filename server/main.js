import { Meteor } from 'meteor/meteor';
import querystring from 'querystring';

Meteor.startup(() => {
  
});

Meteor.methods({
  getListings(params) {
    const hostname = 'http://api.zoopla.co.uk';
    const path = '/api/v1/';
    const endpoint = 'property_listings.json';
    const query = querystring.stringify({
      ...params,
      api_key: 'jq6upw59fwrcsdwk826u757y',
    });

    const url = `${hostname}${path}${endpoint}?${query}`;
 
    return Meteor.http.get(url);
  }
});