import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import { BED_VALUES } from '../../../constants/formValues';

import { updateMinBeds } from '../../../actions/propertyInputs';

class Beds extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onUpdateMinBeds(parseInt(value));
  }

  get selectOptions() {
    return BED_VALUES.map(item => (
      <Select.Option key={item}>{item === 0 ? 'No min' : `${item}+`}</Select.Option>
    ));
  }

  render() {
    const { minBeds } = this.props;

    return (
      <div className="PropertySection-beds u-formInput">
        <Select onChange={this.onChange} value={`${minBeds}`}>
          {this.selectOptions}
        </Select>
      </div>
    );
  }
}

Beds.propTypes = {
  minBeds: PropTypes.number,
};

const mapStateToProps = (state) => ({
  minBeds: state.propertyInputs.minBeds,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateMinBeds(amount) {
    dispatch(updateMinBeds(amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Beds);
