import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style/css';

import { updateGovernmentLoan } from '../../../actions/mortgageInputs';

class GovernmentLoan extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateGovernmentLoan } = this.props;

    onUpdateGovernmentLoan(value);
  }

  get popoverContent() {
    return (
      <div>
        <p>
          Government loan of up to 40% of
          the purchase price inside Greater London
          and up to 20% outside Geater London.
          The buyer can then reduce their
          deposit to as low as 5%.
        </p>
        <p>
          The maximum you can borrow
          from Help to Buy in England
          is £120,000 and up to
          £240,000 for London.
        </p>
        <p>
          See more <a href="https://www.helptobuy.gov.uk/equity-loan/equity-loans/">here</a>.
        </p>
      </div>
    );
  }

  render() {
    const { governmentLoan, region } = this.props;

    return (
      <div className="MortgageSection-governmentLoan u-formInput">
        <span>
          Government loan 
          <Popover
            title="Help to Buy Equity Loan"
            content={this.popoverContent}
            overlayClassName="Popover"
          >
            <Icon type="info-circle-o" />
          </Popover>
        </span>
        <Slider
          min={0}
          max={region === 'London' ? 40 : 20}
          step={1}
          onChange={this.onChange}
          value={governmentLoan}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

GovernmentLoan.propTypes = {
  governmentLoan: PropTypes.number,
};

const mapStateToProps = (state) => ({
  governmentLoan: state.mortgageInputs.governmentLoan,
  region: state.propertySearch.region,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateGovernmentLoan(governmentLoan) {
    dispatch(updateGovernmentLoan(governmentLoan));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GovernmentLoan);
