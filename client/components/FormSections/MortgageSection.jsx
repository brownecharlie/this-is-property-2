import React from 'react';
import { Meteor } from 'meteor/meteor';

import Deposit from '../MortgageInputs/Deposit';
import InterestRate from '../MortgageInputs/InterestRate';
import BrokerFee from '../MortgageInputs/BrokerFee';
import LoanType from '../MortgageInputs/LoanType';
import Term from '../MortgageInputs/Term';

export default function MortgageInputs() {
  return (
    <div className="MortgageInputs">
      <Deposit />
      <InterestRate />
      <BrokerFee />
      <LoanType />
      <Term />
    </div>
  );
}