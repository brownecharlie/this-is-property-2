import { Meteor } from 'meteor/meteor';
import querystring from 'querystring';

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
  },

  getAdminDistrict(params) {
    const hostname = 'http://api.postcodes.io';
    const endpoint = '/postcodes';
    const query = querystring.stringify({
      ...params,
    });

    const url = `${hostname}${endpoint}?${query}`;
 
    return Meteor.http.get(url);
  },

  getAveragePrices(adminDistrict) {
    const hostname = 'http://landregistry.data.gov.uk';
    const path = '/data/hpi/region/';
    const endpoint = `${adminDistrict}.json`;
    const query = querystring.stringify({
      _properties: 'averagePricesSASM',
      _pageSize: 48,
      _page: 0,
    });

    const url = `${hostname}${path}${endpoint}?${query}`;
 
    return Meteor.http.get(url);
  },
});