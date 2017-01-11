import React from 'react';
import { Meteor } from 'meteor/meteor';

import Price from '../PurchaseInputs/Price';
import StampDuty from '../PurchaseInputs/StampDuty';
import BuyToLet from '../PurchaseInputs/BuyToLet';
import SurveyFees from '../PurchaseInputs/SurveyFees';
import PurchaseLegalFees from '../PurchaseInputs/PurchaseLegalFees';
import PurchaseAgentFees from '../PurchaseInputs/PurchaseAgentFees';
import HoldPeriod from '../PurchaseInputs/HoldPeriod';
import Growth from '../PurchaseInputs/Growth';
import RentalIncome from '../PurchaseInputs/RentalIncome';
import SaleLegalFees from '../PurchaseInputs/SaleLegalFees';
import SaleAgentFees from '../PurchaseInputs/SaleAgentFees';

export default function PurchaseInputs() {
  return (
    <div className="PurchaseInputs">
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