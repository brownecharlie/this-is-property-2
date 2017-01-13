import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import getListings from '../utils/getListings';

import { updateListings } from '../actions/propertyListings';
 
import AccountsUIWrapper from './Accounts';
import FormContainer from './FormContainer';
import ReturnsContainer from './ReturnsContainer';
import ListingsContainer from './ListingsContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onUpdateListings } = this.props;

    Meteor.call('getIp', (err, ip) => {
      getListings({ ...this.props, location: ip.city }, listings => {
        onUpdateListings(listings);
      });
    });
  }
 
  render() {
    return (
      <div className="AppContainer">
        <AccountsUIWrapper />
        <FormContainer />
        <ListingsContainer />
        <ReturnsContainer />
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  minBeds: PropTypes.number,
  location: PropTypes.string,
  radius: PropTypes.number,
  type: PropTypes.string,
  orderBy: PropTypes.string,
};

const mapStateToProps = (state) => ({
  minPrice: state.propertyInputs.minPrice,
  maxPrice: state.propertyInputs.maxPrice,
  minBeds: state.propertyInputs.minBeds,
  location: state.propertyInputs.location,
  radius: state.propertyInputs.radius,
  type: state.propertyInputs.type,
  orderBy: state.propertyInputs.orderBy,
});
 
const mapDispatchToProps = (dispatch) => ({
  onUpdateListings(listings) {
    dispatch(updateListings(listings));
  },
});

export default createContainer(() => {
  // Meteor.subscribe('tasks');

  return {
    // tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, connect(mapStateToProps, mapDispatchToProps)(App));