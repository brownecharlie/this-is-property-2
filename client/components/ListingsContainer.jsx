import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listings = this.props.propertyListings.listing || [];
    return (
      <div className="ListingsContainer">
        <ul>{listings.map((listing, index) => (
          <li key={index}>
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

export default connect(mapStateToProps)(ListingsContainer);
