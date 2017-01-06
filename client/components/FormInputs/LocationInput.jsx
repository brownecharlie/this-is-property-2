import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateLocation } from '../../actions/propertyInputs';

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateLocation(event.target.value);
  }

  render() {
    const { location } = this.props;

    return (
      <div className="LocationInput">
        <span>Location</span>
        <input type="text" onChange={this.onChange} value={location} />
      </div>
    );
  }
}

LocationInput.propTypes = {
  location: PropTypes.string,
};

const mapStateToProps = (state) => ({
  location: state.propertyInputs.location,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateLocation(amount) {
    dispatch(updateLocation(amount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationInput);
