import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import { TYPE_VALUES } from '../../../constants/formValues';

import { updateType } from '../../../actions/propertyInputs';

class Type extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onUpdateType(value);
  }

  get selectOptions() {
    return TYPE_VALUES.map(item => (
      <Select.Option key={item.value}>{item.label}</Select.Option>
    ));
  }

  render() {
    const { type } = this.props;

    return (
      <div className="PropertySection-type u-formInput">
        <Select onChange={this.onChange} value={type}>
          {this.selectOptions}
        </Select>
      </div>
    );
  }
}

Type.propTypes = {
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
)(Type);
