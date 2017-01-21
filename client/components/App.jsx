import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from './Header';

import getListings from '../utils/getListings';
import { updateListings } from '../actions/propertyListings';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { onUpdateListings, propertyInputs } = this.props;

    Meteor.call('getUserLocationFromIp', (err, userLocation) => {
      if (err) { console.log(err); return; }

      getListings({ ...propertyInputs, location: userLocation.city }, listings => {
        onUpdateListings(listings);
      });
    });
  }
 
  render() {
    return (
      <div className="AppContainer">
        <Header />
        {this.props.children}
        <footer className="AppFooter">This is the footer</footer>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.node.isRequired,
  propertyInputs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  propertyInputs: state.propertyInputs,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateListings(listings) {
    dispatch(updateListings(listings));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);