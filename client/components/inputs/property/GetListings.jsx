import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import getListings from '../../../utils/getListings';

import {
  updateListing,
  updateAdminDistrict,
  updateRegion,
  updateFiveYearGrowth,
} from '../../../actions/propertySearch';

class GetListings extends Component {
  constructor(props) {
    super(props);

    this.onClickGetListings = this.onClickGetListings.bind(this);
  }

  onClickGetListings() {
    const {
      propertyInputs,
      onUpdateListing,
      onUpdateAdminDistrict,
      onUpdateRegion,
      onUpdateFiveYearGrowth,
    } = this.props;

    getListings({ ...propertyInputs }, data => {
      onUpdateListing(data.listing);
      onUpdateAdminDistrict(data.adminDistrict);
      onUpdateRegion(data.region);
      onUpdateFiveYearGrowth(data.fiveYearGrowth);
    });
  }

  render() {
    return (
      <div className="PropertySection-getListings u-formInput">
        <Button onClick={this.onClickGetListings} type="ghost">Get listings</Button>
      </div>
    );
  }
}

GetListings.propTypes = {
  propertyInputs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  propertyInputs: state.propertyInputs,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateListing(listing) {
    dispatch(updateListing(listing));
  },
  onUpdateAdminDistrict(adminDistrict) {
    dispatch(updateAdminDistrict(adminDistrict));
  },
  onUpdateRegion(region) {
    dispatch(updateRegion(region));
  },
  onUpdateFiveYearGrowth(fiveYearGrowth) {
    dispatch(updateFiveYearGrowth(fiveYearGrowth));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetListings);