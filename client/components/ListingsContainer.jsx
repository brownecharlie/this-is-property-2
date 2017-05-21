import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import formatCurrency from '../utils/formatCurrency';

import { updatePrice } from '../actions/purchaseInputs';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);

    this.onListingClick = this.onListingClick.bind(this);
  }

  onListingClick(event) {
    event.preventDefault();

    const price = parseInt(event.currentTarget.getAttribute('data-price'));
    const { onUpdatePrice } = this.props;

    onUpdatePrice(price);
  }

  render() {
    const listings = this.props.listing.listing || [];

    return (
      <div className="ListingsContainer">
        <h3 className="ListingsContainer-title">PROPERTY LISTINGS</h3>
        <ul className="ListingsContainer-listings">{listings.map((listing, index) => (
          <li key={index} >
            <a href={listing.details_url} target="_blank">
              <img src={listing.image_url} alt="" />
              <span className="price">{formatCurrency(parseInt(listing.price))}</span>
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: listing.short_description }}
              />
              <Icon
                type="pie-chart"
                className="logo"
                onClick={this.onListingClick}
                data-price={listing.price}
              />
            </a>
          </li>
        ))}</ul>
      </div>
    );
  }
}

ListingsContainer.propTypes = {
  listing: PropTypes.object,
};

const mapStateToProps = (state) => ({
  listing: state.propertySearch.listing,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePrice(price) {
    dispatch(updatePrice(price));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsContainer);
