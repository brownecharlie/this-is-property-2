import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './Header';

import getListings from '../utils/getListings';

import {
  updateListing,
  updateAdminDistrict,
  updateRegion,
  updateFiveYearGrowth,
} from '../actions/propertySearch';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      onUpdateListing,
      onUpdateAdminDistrict,
      onUpdateRegion,
      onUpdateFiveYearGrowth,
      propertyInputs,
    } = this.props;

    Meteor.call('getUserLocationFromIp', (err, userLocation) => {
      if (err) { console.log(err); return; }

      getListings({ ...propertyInputs, location: userLocation.city }, data => {
        onUpdateListing(data.listing);
        onUpdateAdminDistrict(data.adminDistrict);
        onUpdateRegion(data.region);
        onUpdateFiveYearGrowth(data.fiveYearGrowth);
      });
    });
  }
 
  render() {
    const { navActive } = this.props;

    return (
      <div className={`AppContainer ${navActive ? 'navActive' : ''}`}>
        <Header />
        {this.props.children}
        <footer className="AppFooter">This is the footer</footer>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  propertyInputs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  propertyInputs: state.propertyInputs,
  navActive: state.navigation.navActive,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);