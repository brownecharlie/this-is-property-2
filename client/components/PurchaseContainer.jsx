import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TweenMax from 'gsap';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import Price from './inputs/purchase/Price';
import StampDuty from './inputs/purchase/StampDuty';
import BuyToLet from './inputs/purchase/BuyToLet';
import HoldPeriod from './inputs/purchase/HoldPeriod';
import Growth from './inputs/purchase/Growth';

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
      <div className="PurchaseContainer">

        <div className="PurchaseContainer-price"><Price /></div>
        
        <nav className="PurchaseContainer-nav">
          <ul>
            <li 
              className={`${activeInput === 'holdPeriod' ? 'active' : ''}`}
              data-type="holdPeriod"
              onClick={this.inputHeaderClicked}>
                <span>Hold period</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'growth' ? 'active' : ''}`}
              data-type="growth"
              onClick={this.inputHeaderClicked}>
                <span>Growth</span>
                <Icon type="right" />
            </li>
            <li 
              className={`${activeInput === 'stampDuty' ? 'active' : ''}`}
              data-type="stampDuty"
              onClick={this.inputHeaderClicked}>
                <span>Stamp duty</span>
                <Icon type="right" />
            </li>
            <li>
              <span>Buy to let</span>
              <BuyToLet />
            </li>
          </ul>
        </nav>

        <div className="PurchaseContainer-inputs">
          <div className={`PurchaseContainer-holdPeriod ${activeInput === 'holdPeriod' ? 'active' : ''}`}><HoldPeriod /></div>
          <div className={`PurchaseContainer-growth ${activeInput === 'growth' ? 'active' : ''}`}><Growth /></div>
          <div className={`PurchaseContainer-stampDuty ${activeInput === 'stampDuty' ? 'active' : ''}`}><StampDuty /></div>
        </div>
      </div>
    );
  }
}