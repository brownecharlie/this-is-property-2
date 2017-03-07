import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import PriceRange from './inputs/property/Price';
import Beds from './inputs/property/Beds';
import Location from './inputs/property/Location';
import Radius from './inputs/property/Radius';
import Type from './inputs/property/Type';
import OrderBy from './inputs/property/OrderBy';
import GetListings from './inputs/property/GetListings';

export default class PropertyForm extends Component {
  constructor() {
    super();

    this.headerClicked = this.headerClicked.bind(this);
  }

  componentDidMount() {
    const inputSections = document.querySelectorAll('.SearchContainer-inputs');

    for (const section of inputSections) {
      if (Array.from(inputSections).indexOf(section) !== 0) {
        TweenMax.set(section, { height: 0 });
      }
    }
  }

  headerClicked(event) {
    const target = event.currentTarget.parentElement.querySelector('.SearchContainer-inputs');

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
      <article className="SearchContainer">
        <section className="SearchContainer-section is-active">
          <header className="SearchContainer-header" onClick={this.headerClicked}>
            <h3>Property Search</h3>
            <Icon type="caret-down" className="u-floatRight"/>
          </header>
          <div className="SearchContainer-inputs" ref="inputs">
            <div className="SearchContainer-inputWrapper">
              <PriceRange />
              <Location />
              <Beds />
              <Radius />
              <Type />
              <OrderBy />
              <GetListings />
            </div>
          </div>
        </section>
      </article>
    );
  }
}