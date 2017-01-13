import React from 'react';
import { Meteor } from 'meteor/meteor';

import PropertySection from './FormSections/PropertySection';
import PurchaseSection from './FormSections/PurchaseSection';
import MortgageSection from './FormSections/MortgageSection';

export default function PropertyForm() {
  return (
    <div className="FormContainer">
      <PropertySection />
      <PurchaseSection />
      <MortgageSection />
    </div>
  );
}