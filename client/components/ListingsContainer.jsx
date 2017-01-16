import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updatePrice } from '../actions/purchaseInputs';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const price = parseInt(event.currentTarget.getAttribute('data-price'));
    const { onUpdatePrice } = this.props;

    onUpdatePrice(price);
  }

  render() {
    const listings = this.props.propertyListings.listing || [];

    return (
      <div className="ListingsContainer">
        <ul>{listings.map((listing, index) => (
          <li onClick={this.onClick} data-price={listing.price} key={index}>
            <img src={listing.image_url} alt="" />
          </li>
        ))}</ul>
      </div>
    );
  }
}

ListingsContainer.propTypes = {
  propertyListings: PropTypes.object,
};

const mapStateToProps = (state) => ({
  propertyListings: state.propertyListings,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePrice(price) {
    dispatch(updatePrice(price));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsContainer);
