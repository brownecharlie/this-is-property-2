import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import AccountsUIWrapper from '../components/Accounts.jsx';
import PropertyForm from '../containers/PropertyForm.jsx';
import PropertyListings from '../components/PropertyListings';

class App extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
          <PropertyForm />
          <PropertyListings />
        </header>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  // Meteor.subscribe('tasks');

  return {
    // tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);