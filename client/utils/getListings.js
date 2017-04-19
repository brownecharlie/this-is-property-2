import store from '../store';

export default async function getListings(params, cb) {
  const { minPrice, maxPrice, minBeds, location, radius, type, orderBy } = params;

  const query = {
    area: location,
    radius: radius,
    minimum_price: minPrice,
    maximum_price: maxPrice === 10000000 ? null : maxPrice,
    minimum_beds: minBeds,
    property_type: type,
    listing_status: 'sale',
    order_by: orderBy,
    page_size: 20,
  };

  let zooplaData, postcodeData, landregistryData;

  try {
    zooplaData = await Meteor.callPromise('getListings', query);
  } catch(error) {
    console.log('Error fetching zoopla data:', error);
  }

  const listing = zooplaData.data;
  const { latitude: lat, longitude: lon } = listing;

  if (listing.disambiguation) {
    console.log('Disambiguation:', listing.disambiguation);
  }

  try {
    postcodeData = await Meteor.callPromise('getAdminDistrict', { lat, lon });
  } catch(error) {
    console.log('Error fetching postcode data:', error);
  }

  const adminDistrict = postcodeData.data.result && postcodeData.data.result[0].admin_district || listing.county;
  const region = postcodeData.data.result && postcodeData.data.result[0].region || listing.county;

  try {
    landregistryData = await Meteor.callPromise('getAveragePrices', adminDistrict.replace(/ /g, '-'));
  } catch(error) {
    console.log('Error fetching land registry data:', error);
  }

  const items = landregistryData.data.result.items;
  const fiveYearGrowth = (items[47].annualChange + items[35].annualChange + 
                          items[23].annualChange + items[11].annualChange + 
                          items[0].annualChange) / 5;

  const data = {
    listing,
    adminDistrict,
    region,
    fiveYearGrowth,
  };

  cb(data);
}