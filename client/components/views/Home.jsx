import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
import SearchContainer from '../SearchContainer';
import PurchaseContainer from '../PurchaseContainer';
import FeesIncomeContainer from '../FeesIncomeContainer';
import MortgageContainer from '../MortgageContainer';
import ReturnsContainer from '../ReturnsContainer';
import ListingsContainer from '../ListingsContainer';

export default function Home() {
  return (
    <div className="Home">
      <div className="SearchAndListings">
        <SearchContainer />
        <ListingsContainer />
      </div>
      <div className="MortgageAndReturns">
        <PurchaseContainer />
        <FeesIncomeContainer />
        <MortgageContainer />
        <ReturnsContainer />
      </div>
    </div>
  );
}