import React from 'react';
import { Meteor } from 'meteor/meteor';

import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';

import PropertySection from './FormSections/PropertySection';
import PurchaseSection from './FormSections/PurchaseSection';
import MortgageSection from './FormSections/MortgageSection';

export default function PropertyForm() {
  return (
    <div className="FormContainer">
      <Tabs tabPosition={'top'}>
        <Tabs.TabPane tab="Property Inputs" key="1"><PropertySection /></Tabs.TabPane>
        <Tabs.TabPane tab="Purchase Inputs" key="2"><PurchaseSection /></Tabs.TabPane>
        <Tabs.TabPane tab="Mortgage Inputs" key="3"><MortgageSection /></Tabs.TabPane>
      </Tabs>
    </div>
  );
}