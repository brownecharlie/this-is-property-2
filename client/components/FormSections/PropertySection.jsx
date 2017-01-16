import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import { updateListings } from '../../actions/propertyListings';

import Price from '../Inputs/Property/Price';
import Beds from '../Inputs/Property/Beds';
import Location from '../Inputs/Property/Location';
import Radius from '../Inputs/Property/Radius';
import Type from '../Inputs/Property/Type';
import OrderBy from '../Inputs/Property/OrderBy';

class PropertySection extends Component {
  constructor(props) {
    super(props);

    this.onClickGetListings = this.onClickGetListings.bind(this);
  }

  onClickGetListings() {
    const {
      minPrice,
      maxPrice,
      minBeds,
      location,
      radius,
      type,
      orderBy,
    } = this.props;

    const params = {
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

    Meteor.call('getListings', params, (err, result) => {
      if (err) { console.log(err); return; }
      this.props.onUpdateListings(result.data);
    });
  }

  render() {
    return (
      <div className="PropertySection">
        <Price />
        <Location />
        <Beds />
        <Radius />
        <Type />
        <OrderBy />
        <div className="FormInput PropertyInput PropertyInput-getListings">
          <Button onClick={this.onClickGetListings} type="ghost">Get listings</Button>
        </div>
      </div>
    );
  }
}

PropertySection.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertySection);