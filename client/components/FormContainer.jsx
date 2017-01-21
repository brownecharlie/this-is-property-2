import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import PriceRange from './inputs/property/Price';
import Beds from './inputs/property/Beds';
import Location from './inputs/property/Location';
import Radius from './inputs/property/Radius';
import Type from './inputs/property/Type';
import OrderBy from './inputs/property/OrderBy';
import GetListings from './inputs/property/GetListings';

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
    const inputSections = document.querySelectorAll('.FormContainer-inputs');

    for (const section of inputSections) {
      section.setAttribute('data-height', section.clientHeight);
      if (Array.from(inputSections).indexOf(section) !== 0) {
        TweenMax.set(section, { height: 0 });
      }
    }
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.FormContainer-inputs');

    event.currentTarget.parentElement.classList.toggle('is-active');

    TweenMax.to(target, 0.5, {
      height: target.clientHeight === 0 ? target.getAttribute('data-height') : 0,
      ease: Power3.easeOut,
    });
  }

  render() {
    return (
      <article className="FormContainer">
        <section className="FormContainer-section is-active">
          <header className="FormContainer-header" onClick={this.headerClicked}>
            <h3>Property Search</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="FormContainer-inputs" ref="inputs">
            <div className="FormContainer-inputWrapper">
              <PriceRange />
              <Location />
              <Beds />
              <Radius />
              <Type />
              <OrderBy />
              <GetListings />
            </div>
          </div>
        </section>

        <section className="FormContainer-section">
          <header className="FormContainer-header" onClick={this.headerClicked}>
            <h3>Purchase Information</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="FormContainer-inputs" ref="inputs">
            <div className="FormContainer-inputWrapper">
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

        <section className="FormContainer-section">
          <header className="FormContainer-header" onClick={this.headerClicked}>
            <h3>Mortgage Information</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="FormContainer-inputs" ref="inputs">
            <div className="FormContainer-inputWrapper">
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