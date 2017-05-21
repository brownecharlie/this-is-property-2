import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './Header';

import getListings from '../utils/getListings';

import { updateAppLoading } from '../actions/navigation';

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
      onUpdateAppLoading,
      onUpdateListing,
      onUpdateAdminDistrict,
      onUpdateRegion,
      onUpdateFiveYearGrowth,
      propertyInputs,
    } = this.props;

    console.log('---[ APP LOADING ]---');

    Meteor.call('getUserLocationFromIp', (err, userLocation) => {
      if (err) { console.log(err); return; }

      getListings({ ...propertyInputs, location: userLocation.city }, data => {
        onUpdateListing(data.listing);
        onUpdateAdminDistrict(data.adminDistrict);
        onUpdateRegion(data.region);
        onUpdateFiveYearGrowth(data.fiveYearGrowth);

        onUpdateAppLoading(false);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.appLoading) {
      console.log('---[ APP LOADED ]---');
    }
  }
 
  render() {
    const { navActive } = this.props;

    return (
      <div className={`AppContainer ${navActive ? 'navActive' : ''}`}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  appLoading: PropTypes.bool,
  propertyInputs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  appLoading: state.navigation.appLoading,
  navActive: state.navigation.navActive,
  propertyInputs: state.propertyInputs,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateAppLoading(isLoading) {
    dispatch(updateAppLoading(isLoading));
  },
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