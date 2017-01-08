import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { TYPE_VALUES } from '../../constants/formValues';

import { updateType } from '../../actions/propertyInputs';

class TypeInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateType(event.target.value);
  }

  get selectOptions() {
    return TYPE_VALUES.map(item => (
      <option key={item.value} value={item.value}>{item.label}</option>
    ));
  }

  render() {
    const { type } = this.props;

    return (
      <div className="TypeInput">
        <span>Property type</span>
        <select onChange={this.onChange} value={type}>
          {this.selectOptions}
        </select>
      </div>
    );
  }
}

TypeInput.propTypes = {
  type: PropTypes.string,
};

const mapStateToProps = (state) => ({
  type: state.propertyInputs.type,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateType(type) {
    dispatch(updateType(type));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeInput);
