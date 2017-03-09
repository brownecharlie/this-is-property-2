import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { updatePrice } from '../actions/purchaseInputs';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);

    this.onListingClick = this.onListingClick.bind(this);
    this.headerClicked = this.headerClicked.bind(this);
  }

  onListingClick(event) {
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

    return (
      <div className="ListingsContainer">
        <div className="ListingsContainer-section is-active">
          <header className="ListingsContainer-header" onClick={this.headerClicked}>
            <h3>Property Listings</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <ul className="ListingsContainer-listings">{listings.map((listing, index) => (
            <li onClick={this.onListingClick} data-price={listing.price} key={index}>
              <img src={listing.image_url} alt="" />
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
