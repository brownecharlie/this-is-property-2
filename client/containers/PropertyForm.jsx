import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import { updateListings } from '../actions/propertyListings';

import PropertySection from '../components/FormSections/PropertySection';
import PurchaseSection from '../components/FormSections/PurchaseSection';
import MortgageSection from '../components/FormSections/MortgageSection';

class PropertyForm extends Component {
  constructor(props) {
    super(props);

    this.onClickGetReturns = this.onClickGetReturns.bind(this);
  }

  onClickGetReturns() {
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
      maximum_price: maxPrice === 10000000 ? null : maxPrice,
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
        this.props.onUpdateListings(result.data);
      }
    });
  }
 
  render() {
    return (
      <div className="PropertyForm">
        <PropertySection />
        <hr />
        <Button onClick={this.onClickGetReturns} type="ghost">Get listings</Button>
        <hr />
        <PurchaseSection />
        <hr />
        <MortgageSection />
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