import React from 'react';
import { Meteor } from 'meteor/meteor';

import Price from '../PurchaseInputs/Price';
import StampDuty from '../PurchaseInputs/StampDuty';
import BuyToLet from '../PurchaseInputs/BuyToLet';

export default function PurchaseInputs() {
  return (
    <div className="PurchaseInputs">
      <Price />
      <StampDuty />
      <BuyToLet />
    </div>
  );
}