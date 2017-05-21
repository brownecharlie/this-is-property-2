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

    this.state = {
      activeInput: null,
    };

    this.inputHeaderClicked = this.inputHeaderClicked.bind(this);
  }

  inputHeaderClicked(event) {
    const type = event.currentTarget.getAttribute('data-type');

    this.setState({ activeInput: type });
  }

  render() {
    const { activeInput } = this.state;

    return (
      <div className="SearchContainer">

        <div className="SearchContainer-location"><Location /></div>

        <nav className="SearchContainer-nav">
          <ul>
            <li 
              className={`${activeInput === 'priceRange' ? 'active' : ''}`}
              data-type="priceRange"
              onClick={this.inputHeaderClicked}>
                <span>Price</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'beds' ? 'active' : ''}`}
              data-type="beds"
              onClick={this.inputHeaderClicked}>
                <span>Beds</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'type' ? 'active' : ''}`}
              data-type="type"
              onClick={this.inputHeaderClicked}>
                <span>Property type</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'radius' ? 'active' : ''}`}
              data-type="radius"
              onClick={this.inputHeaderClicked}>
                <span>Radius</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'orderBy' ? 'active' : ''}`}
              data-type="orderBy"
              onClick={this.inputHeaderClicked}>
                <span>Sort by</span>
                <Icon type="right" />
            </li>
          </ul>
        </nav>

        <div className="SearchContainer-inputs">
          <div className={`SearchContainer-priceRange ${activeInput === 'priceRange' ? 'active' : ''}`}><PriceRange /></div>
          <div className={`SearchContainer-beds ${activeInput === 'beds' ? 'active' : ''}`}><Beds /></div>
          <div className={`SearchContainer-type ${activeInput === 'type' ? 'active' : ''}`}><Type /></div>
          <div className={`SearchContainer-radius ${activeInput === 'radius' ? 'active' : ''}`}><Radius /></div>
          <div className={`SearchContainer-orderBy ${activeInput === 'orderBy' ? 'active' : ''}`}><OrderBy /></div>
        </div>

        <img className="SearchContainer-zooplaLogo" src="images/zoopla_logo.jpg"/>

      </div>
    );
  }
}