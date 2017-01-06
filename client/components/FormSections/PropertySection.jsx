import React from 'react';
import { Meteor } from 'meteor/meteor';

import PriceInputs from '../FormInputs/PriceInputs';
import BedInput from '../FormInputs/BedInput';
import LocationInput from '../FormInputs/LocationInput';
import RadiusInput from '../FormInputs/RadiusInput';
import TypeInput from '../FormInputs/TypeInput';
import OrderByInput from '../FormInputs/OrderByInput';

export default function PropertyInputs() {
  return (
    <div className="PropertyInputs">
      <PriceInputs />
      <BedInput />
      <LocationInput />
      <RadiusInput />
      <TypeInput />
      <OrderByInput />
    </div>
  );
}
