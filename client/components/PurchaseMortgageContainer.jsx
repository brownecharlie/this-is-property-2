import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import Price from './inputs/purchase/Price';
import StampDuty from './inputs/purchase/StampDuty';
import BuyToLet from './inputs/purchase/BuyToLet';
import SurveyFees from './inputs/purchase/SurveyFees';
import PurchaseLegalFees from './inputs/purchase/PurchaseLegalFees';
import PurchaseAgentFees from './inputs/purchase/PurchaseAgentFees';
import HoldPeriod from './inputs/purchase/HoldPeriod';
import Growth from './inputs/purchase/Growth';
import RentalIncome from './inputs/purchase/RentalIncome';
import SaleLegalFees from './inputs/purchase/SaleLegalFees';
import SaleAgentFees from './inputs/purchase/SaleAgentFees';

import Deposit from './inputs/mortgage/Deposit';
import InterestRate from './inputs/mortgage/InterestRate';
import BrokerFee from './inputs/mortgage/BrokerFee';
import LoanType from './inputs/mortgage/LoanType';
import Term from './inputs/mortgage/Term';

export default class PropertyForm extends Component {
  constructor() {
    super();

    this.headerClicked = this.headerClicked.bind(this);
  }

  componentDidMount() {
    const inputSections = document.querySelectorAll('.PurchaseMortgageContainer-inputs');

    for (const section of inputSections) {
      if (Array.from(inputSections).indexOf(section) !== 0) {
        TweenMax.set(section, { height: 0 });
      }
    }
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.PurchaseMortgageContainer-inputs');

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
      <article className="PurchaseMortgageContainer">
        <section className="PurchaseMortgageContainer-section is-active">
          <header className="PurchaseMortgageContainer-header" onClick={this.headerClicked}>
            <h3>Purchase Information</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="PurchaseMortgageContainer-inputs" ref="inputs">
            <div className="PurchaseMortgageContainer-inputWrapper">
              <Price />
              <BuyToLet />
              <StampDuty />
              <HoldPeriod />
              <Growth />
              <RentalIncome />
              <SurveyFees />
              <PurchaseLegalFees />
              <PurchaseAgentFees />
              <SaleLegalFees />
              <SaleAgentFees />
            </div>
          </div>
        </section>

        <section className="PurchaseMortgageContainer-section">
          <header className="PurchaseMortgageContainer-header" onClick={this.headerClicked}>
            <h3>Mortgage Information</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="PurchaseMortgageContainer-inputs" ref="inputs">
            <div className="PurchaseMortgageContainer-inputWrapper">
              <Deposit />
              <InterestRate />
              <BrokerFee />
              <LoanType />
              <Term />
            </div>
          </div>
        </section>
      </article>
    );
  }
}