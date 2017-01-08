import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateListings } from '../actions/propertyListings';

import PropertySection from '../components/FormSections/PropertySection.jsx';
import PurchaseSection from '../components/FormSections/PurchaseSection.jsx';

class PropertyForm extends Component {
  constructor(props) {
    super(props);

    this.onClickGetReturns = this.onClickGetReturns.bind(this);
  }

  onClickGetReturns(event) {
    const {
      minPrice,
      maxPrice,
      minBeds,
      location,
      radius,
      type,
      orderBy,
    } = this.props.propertyInputs;

    const params = {
      area: location === '' ? 'England' : location,
      radius: radius,
      minimum_price: minPrice,
      maximum_price: maxPrice === 0 ? null : maxPrice,
      minimum_beds: minBeds,
      property_type: type,
      listing_status: 'sale',
      order_by: orderBy,
      page_size: 20,
    };

    Meteor.call('getListings', params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.data);
        this.props.onUpdateListings(result.data);
      }
    });
  }
 
  render() {
    return (
      <div className="PropertyForm">
        <PropertySection />
        <hr />
        <PurchaseSection />
        <hr />
        <button onClick={this.onClickGetReturns}>Get Returns!</button>
      </div>
    );
  }
}

PropertyForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyForm);