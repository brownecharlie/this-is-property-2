import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { RADIUS_VALUES } from '../../constants/formValues';

import { updateRadius } from '../../actions/propertyInputs';

class RadiusInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateRadius(parseInt(event.target.value));
  }

  get selectOptions() {
    return RADIUS_VALUES.map(item => (
      <option key={item} value={item}>{item === 0 ? 'This area only' : `Within ${item} miles`}</option>
    ));
  }

  render() {
    const { radius } = this.props;

    return (
      <div className="RadiusInput">
        <span>Distance from location</span>
        <select onChange={this.onChange} value={radius}>
          {this.selectOptions}
        </select>
      </div>
    );
  }
}

RadiusInput.propTypes = {
  radius: PropTypes.number,
};

const mapStateToProps = (state) => ({
  radius: state.propertyInputs.radius,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateRadius(amount) {
    dispatch(updateRadius(amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadiusInput);
