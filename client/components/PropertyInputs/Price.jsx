import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { PRICE_VALUES } from '../../constants/formValues';

import { updateMinPrice, updateMaxPrice } from '../../actions/propertyInputs';

class PropertyInputs extends Component {
  constructor(props) {
    super(props);

    this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
    this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
  }

  onChangeMinPrice(event) {
    this.props.onUpdateMinPrice(parseInt(event.target.value));
  }

  onChangeMaxPrice(event) {
    this.props.onUpdateMaxPrice(parseInt(event.target.value));
  }

  get minPriceSelectOptions() {
    return PRICE_VALUES.map(item => {
      if (item > this.props.maxPrice && this.props.maxPrice !== 0) return;
      return <option key={item} value={item}>{item === 0 ? 'No min' : item}</option>
    });
  }

  get maxPriceSelectOptions() {
    return PRICE_VALUES.map(item => {
      if (item === 0) return <option key={item} value={item}>No max</option>
      if (item < this.props.minPrice) return;
      return <option key={item} value={item}>{item === 0 ? 'No max' : item}</option>
    });
  }

  render() {
    const { minPrice, maxPrice } = this.props;

    return (
        <div className="PriceInputs">
          <div className="PriceInputs-min">
            <span>Min price</span>
            <select onChange={this.onChangeMinPrice} value={minPrice}>
              {this.minPriceSelectOptions}
            </select>
          </div>

          <div className="PriceInputs-max">
            <span>Max Price</span>
            <select onChange={this.onChangeMaxPrice} value={maxPrice}>
              {this.maxPriceSelectOptions}
            </select>
          </div>
        </div>
    );
  }
}

PropertyInputs.propTypes = {
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
};

const mapStateToProps = (state) => ({
  minPrice: state.propertyInputs.minPrice,
  maxPrice: state.propertyInputs.maxPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateMinPrice(price) {
    dispatch(updateMinPrice(price));
  },
  onUpdateMaxPrice(price) {
    dispatch(updateMaxPrice(price));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyInputs);
