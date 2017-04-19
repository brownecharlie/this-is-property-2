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
    this.headerClicked = this.headerClicked.bind(this);
  }

  onListingClick(event) {
    event.preventDefault();

    const price = parseInt(event.currentTarget.getAttribute('data-price'));
    const { onUpdatePrice } = this.props;

    onUpdatePrice(price);
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.ListingsContainer-listings');

    event.currentTarget.parentElement.classList.toggle('is-active');

    if (!event.currentTarget.parentElement.classList.contains('is-active')) {
      TweenMax.to(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });      
    } else {
      TweenMax.set(target, { height: 'auto' });
      TweenMax.from(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });
    }
  }

  render() {
    const listings = this.props.listing.listing || [];

    console.log(listings);

    return (
      <div className="ListingsContainer">
        <div className="ListingsContainer-section is-active">
          <header className="ListingsContainer-header" onClick={this.headerClicked}>
            <h3>Property Listings</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <ul className="ListingsContainer-listings">{listings.map((listing, index) => (
            <li key={index} >
              <a href={listing.details_url} target="_blank">
                <img src={listing.image_url} alt="" />
                <span className="price">{formatCurrency(parseInt(listing.price))}</span>
                <p
                  className="description"
                  dangerouslySetInnerHTML={{ __html: listing.short_description }}
                />
                <span
                  className="logo"
                  onClick={this.onListingClick}
                  data-price={listing.price}
                />
              </a>
            </li>
          ))}</ul>
        </div>
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
