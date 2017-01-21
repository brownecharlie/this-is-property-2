import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
import FormContainer from '../FormContainer';
import ReturnsContainer from '../ReturnsContainer';
import ListingsContainer from '../ListingsContainer';

export default function Home() {
  return (
    <div className="Home">
      <FormContainer />
      <ListingsContainer />
      <ReturnsContainer />
    </div>
  );
}