import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import PropertyReturns from './returns/PropertyReturns';
import DayOnePayment from './returns/DayOnePayment';
import MortgagePayments from './returns/MortgagePayments';

export default class PropertyForm extends Component {
  constructor() {
    super();

    this.headerClicked = this.headerClicked.bind(this);
  }

  componentDidMount() {
    const inputSections = document.querySelectorAll('.ReturnsContainer-values');

    for (const section of inputSections) {
      if (Array.from(inputSections).indexOf(section) !== 0) {
        TweenMax.set(section, { height: 0 });
      }
    }
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.ReturnsContainer-values');

    event.currentTarget.parentElement.classList.toggle('is-active');

    if (!event.currentTarget.parentElement.classList.contains('is-active')) {
      TweenMax.to(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });      
    } else {
      TweenMax.set(target, { height: 'auto' });
      TweenMax.from(target, 0.5, {
        height: 0,
        ease: Power3.easeOut,
      });
    }
  }

  render() {
    return (
      <article className="ReturnsContainer">
        <PropertyReturns headerClicked={this.headerClicked} />
        <DayOnePayment headerClicked={this.headerClicked} />
        <MortgagePayments headerClicked={this.headerClicked} />
      </article>
    );
  }
}