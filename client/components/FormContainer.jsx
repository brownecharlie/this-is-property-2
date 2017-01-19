import React from 'react';
import { Meteor } from 'meteor/meteor';

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

export default function PropertyForm() {
  return (
    <article className="FormContainer">
      <section className="PropertySection">
        <header className="PropertySection-header">
          <h2>Property Information</h2>
        </header>
        <PriceRange />
        <Location />
        <Beds />
        <Radius />
        <Type />
        <OrderBy />
        <GetListings />
      </section>

      <section className="PurchaseSection">
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
      </section>

      <section className="MortgageSection">
        <Deposit />
        <InterestRate />
        <BrokerFee />
        <LoanType />
        <Term />
      </section>
    </article>
  );
}