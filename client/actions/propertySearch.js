import {
  UPDATE_LISTING,
  UPDATE_ADMIN_DISTRICT,
  UPDATE_REGION,
  UPDATE_FIVE_YEAR_GROWTH,
} from '../constants';

export function updateListing(listing) {
  return {
    type: UPDATE_LISTING,
    payload: listing,
  };
}

export function updateAdminDistrict(adminDistrict) {
  return {
    type: UPDATE_ADMIN_DISTRICT,
    payload: adminDistrict,
  };
}

export function updateRegion(region) {
  return {
    type: UPDATE_REGION,
    payload: region,
  };
}

export function updateFiveYearGrowth(growth) {
  return {
    type: UPDATE_FIVE_YEAR_GROWTH,
    payload: growth,
  };
}