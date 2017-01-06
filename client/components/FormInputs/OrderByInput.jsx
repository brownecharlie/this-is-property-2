import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { ORDER_BY_VALUES } from '../../constants/formValues';

import { updateOrderBy } from '../../actions/propertyInputs';

class OrderByInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateOrderBy(event.target.value);
  }

  get selectOptions() {
    return ORDER_BY_VALUES.map(item => (
      <option key={item.value} value={item.value}>{item.label}</option>
    ));
  }

  render() {
    const { orderBy } = this.props;

    return (
      <div className="OrderByInput">
        <span>Order by</span>
        <select onChange={this.onChange} value={orderBy}>
          {this.selectOptions}
        </select>
      </div>
    );
  }
}

OrderByInput.propTypes = {
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
)(OrderByInput);
