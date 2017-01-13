import React from 'react';
import { Meteor } from 'meteor/meteor';

import PropertyReturns from './Returns/PropertyReturns';
import DayOnePayment from './Returns/DayOnePayment';
import MortgagePayments from './Returns/MortgagePayments';

export default function PropertyForm() {
  return (
    <div className="ReturnsContainer">
      <h1 className="ReturnsContainer-title">Potential Returns</h1>
      <PropertyReturns />
      <DayOnePayment />
      <MortgagePayments />
    </div>
  );
}