import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import { ORDER_BY_VALUES } from '../../../constants/formValues';

import { updateOrderBy } from '../../../actions/propertyInputs';

class OrderBy extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onUpdateOrderBy(value);
  }

  get selectOptions() {
    return ORDER_BY_VALUES.map(item => (
      <Select.Option key={item.value}>{item.label}</Select.Option>
    ));
  }

  render() {
    const { orderBy } = this.props;

    return (
      <div className="PropertySection-orderBy u-formInput">
        <Select onChange={this.onChange} value={orderBy}>
          {this.selectOptions}
        </Select>
      </div>
    );
  }
}

OrderBy.propTypes = {
  orderBy: PropTypes.string,
};

const mapStateToProps = (state) => ({
  orderBy: state.propertyInputs.orderBy,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateOrderBy(type) {
    dispatch(updateOrderBy(type));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBy);
