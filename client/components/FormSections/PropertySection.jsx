import React from 'react';
import { Meteor } from 'meteor/meteor';

import Price from '../PropertyInputs/Price';
import Beds from '../PropertyInputs/Beds';
import Location from '../PropertyInputs/Location';
import Radius from '../PropertyInputs/Radius';
import Type from '../PropertyInputs/Type';
import OrderBy from '../PropertyInputs/OrderBy';

export default function PropertyInputs() {
  return (
    <div className="PropertyInputs">
      <Price />
      <Beds />
      <Location />
      <Radius />
      <Type />
      <OrderBy />
    </div>
  );
}
