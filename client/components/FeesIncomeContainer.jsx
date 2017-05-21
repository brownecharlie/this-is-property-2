import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import SurveyFees from './inputs/purchase/SurveyFees';
import PurchaseLegalFees from './inputs/purchase/PurchaseLegalFees';
import PurchaseAgentFees from './inputs/purchase/PurchaseAgentFees';
import SaleLegalFees from './inputs/purchase/SaleLegalFees';
import SaleAgentFees from './inputs/purchase/SaleAgentFees';
import RentalIncome from './inputs/purchase/RentalIncome';

export default class FeesIncomeContainer extends Component {
  render() {
    return (
      <div className="FeesIncomeContainer">
        <div className="FeesIncomeContainer-fees">
          <h3 className="FeesIncomeContainer-title">PURCHASE FEES</h3>
          <div className="FeesIncomeContainer-inputs">
            <SurveyFees />
            <PurchaseLegalFees />
            <PurchaseAgentFees />
            <SaleLegalFees />
            <SaleAgentFees />
          </div>
        </div>
        <div className="FeesIncomeContainer-income">
          <h3 className="FeesIncomeContainer-title">PURCHASE INCOME</h3>
          <div className="FeesIncomeContainer-inputs">
            <RentalIncome />
          </div>
        </div>
      </div>
    );
  }
}