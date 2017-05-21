import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

import GetListings from './GetListings';

import { updateLocation } from '../../../actions/propertyInputs';

class Location extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { onUpdateLocation } = this.props;
    
    onUpdateLocation(event.target.value);
  }

  render() {
    const { location } = this.props;

    return (
      <div className="PropertySection-location u-formInput">
        <Input size="large" onChange={this.onChange} value={location} />
        <GetListings />
      </div>
    );
  }
}

Location.propTypes = {
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
)(Location);
