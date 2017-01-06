import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { BED_VALUES } from '../../constants/formValues';

import { updateMinBeds } from '../../actions/propertyInputs';

class BedInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateMinBeds(parseInt(event.target.value));
  }

  get selectOptions() {
    return BED_VALUES.map(item => (
      <option key={item} value={item}>{item === 0 ? 'No min' : `${item}+`}</option>
    ));
  }

  render() {
    const { minBeds } = this.props;

    return (
      <div className="BedInput">
        <span>Beds</span>
        <select onChange={this.onChange} value={minBeds}>
          {this.selectOptions}
        </select>
      </div>
    );
  }
}

BedInput.propTypes = {
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
)(BedInput);
