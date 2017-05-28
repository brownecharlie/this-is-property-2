import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateGrowth } from '../../../actions/purchaseInputs';

class Growth extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateGrowth } = this.props;

    onUpdateGrowth(value);
  }

  render() {
    const { growth } = this.props;

    return (
      <div className="PurchaseSection-growth u-formInput">
        <InputNumber
          min={0}
          onChange={this.onChange}
          value={growth}
          formatter={value => `${value}%`}
          parser={value => value.replace('%', '')}
        />
      </div>
    );
  }
}

Growth.propTypes = {
  growth: PropTypes.number,
};

const mapStateToProps = (state) => ({
  growth: state.purchaseInputs.growth,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateGrowth(growth) {
    dispatch(updateGrowth(growth));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Growth);
