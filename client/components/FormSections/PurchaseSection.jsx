import React from 'react';
import { Meteor } from 'meteor/meteor';

import Price from '../Inputs/Purchase/Price';
import StampDuty from '../Inputs/Purchase/StampDuty';
import BuyToLet from '../Inputs/Purchase/BuyToLet';
import SurveyFees from '../Inputs/Purchase/SurveyFees';
import PurchaseLegalFees from '../Inputs/Purchase/PurchaseLegalFees';
import PurchaseAgentFees from '../Inputs/Purchase/PurchaseAgentFees';
import HoldPeriod from '../Inputs/Purchase/HoldPeriod';
import Growth from '../Inputs/Purchase/Growth';
import RentalIncome from '../Inputs/Purchase/RentalIncome';
import SaleLegalFees from '../Inputs/Purchase/SaleLegalFees';
import SaleAgentFees from '../Inputs/Purchase/SaleAgentFees';

export default function PurchaseSection() {
  return (
    <div className="PurchaseSection">
      <h1 className="PurchaseSection-title">Purchase Inputs</h1>
      <Price />
      <StampDuty />
      <BuyToLet />
      <HoldPeriod />
      <Growth />
      <RentalIncome />
      <SurveyFees />
      <PurchaseLegalFees />
      <PurchaseAgentFees />
      <SaleLegalFees />
      <SaleAgentFees />
    </div>
  );
}