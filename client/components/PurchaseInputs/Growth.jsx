import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateGrowth } from '../../actions/purchaseInputs';

class Growth extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const growth = parseFloat(event.target.value);
    const { onUpdateGrowth } = this.props;

    if (growth) onUpdateGrowth(growth);
  }

  render() {
    const { growth } = this.props;

    return (
      <div className="PurchaseInputs-growth">
        <span>Growth </span>
        <input type="number" onChange={this.onChange} value={growth} />
      </div>
    );
  }
}

Growth.propTypes = {
  growth: PropTypes.number,
};

const mapStateToProps = (state) => ({
  growth: state.purchaseInputs.growth,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateGrowth(growth) {
    dispatch(updateGrowth(growth));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Growth);
