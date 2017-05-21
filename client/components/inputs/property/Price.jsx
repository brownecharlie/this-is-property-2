import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import formatCurrency from '../../../utils/formatCurrency';

import { PRICE_VALUES } from '../../../constants/formValues';

import { updateMinPrice, updateMaxPrice } from '../../../actions/propertyInputs';

class Price extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateMinPrice, onUpdateMaxPrice } = this.props;
    onUpdateMinPrice(value[0]);
    onUpdateMaxPrice(value[1]);
  }

  setStep(min, max) {
    return min * (max - min);
  }

  render() {
    const { minPrice, maxPrice } = this.props;

    return (
      <div className="PropertySection-price u-formInput">
        <Slider
          range
          min={PRICE_VALUES[0]}
          max={PRICE_VALUES[PRICE_VALUES.length - 1]}
          step={10000}
          defaultValue={[minPrice, maxPrice]}
          onChange={this.onChange}
          tipFormatter={value => {
            if (value === 0) return 'No min';
            if (value === 10000000) return 'No Max';
            return `${formatCurrency(value)}`;
          }}
        />
      </div>
    );
  }
}

Price.propTypes = {
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
)(Price);
