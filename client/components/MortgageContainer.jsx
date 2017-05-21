import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import Deposit from './inputs/mortgage/Deposit';
import InterestRate from './inputs/mortgage/InterestRate';
import BrokerFee from './inputs/mortgage/BrokerFee';
import LoanType from './inputs/mortgage/LoanType';
import Term from './inputs/mortgage/Term';
import GovernmentLoan from './inputs/mortgage/GovernmentLoan';
import MortgageSize from './inputs/mortgage/MortgageSize';
import HouseholdIncome from './inputs/mortgage/HouseholdIncome';

export default class PropertyForm extends Component {
  constructor() {
    super();

    this.headerClicked = this.headerClicked.bind(this);
  }

  componentDidMount() {
    const inputSection = findDOMNode(this).querySelector('.MortgageContainer-inputs');

    TweenMax.set(inputSection, { height: 0 });
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.MortgageContainer-inputs');

    event.currentTarget.parentElement.classList.toggle('is-active');

    if (!event.currentTarget.parentElement.classList.contains('is-active')) {
      TweenMax.to(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });      
    } else {
      TweenMax.set(target, { height: 'auto' });
      TweenMax.from(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });
    }
  }

  render() {
    return (
      <div className="MortgageContainer">
        <header className="MortgageContainer-header" onClick={this.headerClicked}>
          <h3>Mortgage Information</h3>
          <Icon type="caret-right" className="u-floatRight"/>
        </header>
        <div className="MortgageContainer-inputs">
          <Deposit />
          <GovernmentLoan />
          <MortgageSize />
          <HouseholdIncome />
          <InterestRate />
          <BrokerFee />
          <LoanType />
          <Term />
        </div>
      </div>
    );
  }
}