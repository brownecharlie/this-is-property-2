import React from 'react';
import { Meteor } from 'meteor/meteor';

import PropertyReturns from './returns/PropertyReturns';
import DayOnePayment from './returns/DayOnePayment';
import MortgagePayments from './returns/MortgagePayments';

export default function PropertyForm() {
  return (
    <div className="ReturnsContainer">
      <PropertyReturns />
      <DayOnePayment />
      <MortgagePayments />
    </div>
  );
}