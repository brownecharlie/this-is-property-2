import React from 'react';
import { Meteor } from 'meteor/meteor';

import Deposit from '../Inputs/Mortgage/Deposit';
import InterestRate from '../Inputs/Mortgage/InterestRate';
import BrokerFee from '../Inputs/Mortgage/BrokerFee';
import LoanType from '../Inputs/Mortgage/LoanType';
import Term from '../Inputs/Mortgage/Term';

export default function MortgageSection() {
  return (
    <div className="MortgageSection">
      <h1 className="MortgageSection-title">Mortgage Inputs</h1>
      <Deposit />
      <InterestRate />
      <BrokerFee />
      <LoanType />
      <Term />
    </div>
  );
}