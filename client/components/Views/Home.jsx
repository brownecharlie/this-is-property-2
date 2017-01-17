import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
import AccountsUIWrapper from '../Accounts';
import FormContainer from '../FormContainer';
import ReturnsContainer from '../ReturnsContainer';
import ListingsContainer from '../ListingsContainer';

export default function Home() {
  return (
    <div className="Home">
      <AccountsUIWrapper />
      <FormContainer />
      <ListingsContainer />
      <ReturnsContainer />
    </div>
  );
}