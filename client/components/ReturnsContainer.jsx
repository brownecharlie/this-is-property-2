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
      section.setAttribute('data-height', section.clientHeight);
      if (Array.from(inputSections).indexOf(section) !== 0) {
        TweenMax.set(section, { height: 0 });
      }
    }
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.ReturnsContainer-values');

    event.currentTarget.parentElement.classList.toggle('is-active');

    TweenMax.to(target, 0.5, {
      height: target.clientHeight === 0 ? target.getAttribute('data-height') : 0,
      ease: Power3.easeOut,
    });
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