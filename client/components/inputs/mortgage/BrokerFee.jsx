import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateBrokerFee } from '../../../actions/mortgageInputs';

class BrokerFee extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateBrokerFee } = this.props;

    onUpdateBrokerFee(value);
  }

  render() {
    const { brokerFee } = this.props;

    return (
      <div className="MortgageSection-brokerFee u-formInput">
        <span>Broker fee </span>
        <InputNumber
          formatter={value => `$ ${value}`}
          min={0}
          step={25}
          onChange={this.onChange}
          value={brokerFee}
        />
      </div>
    );
  }
}

BrokerFee.propTypes = {
  brokerFee: PropTypes.number,
};

const mapStateToProps = (state) => ({
  brokerFee: state.mortgageInputs.brokerFee,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateBrokerFee(brokerFee) {
    dispatch(updateBrokerFee(brokerFee));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrokerFee);
