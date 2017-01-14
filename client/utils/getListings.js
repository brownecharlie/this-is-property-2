export default function getListings(params, cb) {
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

  Meteor.call('getListings', query, (err, result) => {
    if (err) { console.log(err); return; }
    cb(result.data);
  });
}