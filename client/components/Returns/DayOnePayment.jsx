import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';
import {
  calculateDayOnePayment,
  calculateDeposit,
  calculateStampDuty,
} from '../../utils/calculatePropertyReturns';

function DayOnePayment ({ buyToLet, price, purchaseLegalFees, purchaseAgentFees, surveyFees, brokerFee, stampDuty, deposit, headerClicked }) {
  const dayOnePayment = calculateDayOnePayment(deposit, purchaseAgentFees, stampDuty, price, purchaseLegalFees, surveyFees, brokerFee);
  const depositPaid = calculateDeposit(price, deposit);
  const stampDutyPaid = calculateStampDuty(stampDuty, price);

  const data = [
    { name: 'Broker Fee', value: brokerFee, color: '#FF8042' },
    { name: 'Deposit', value: depositPaid, color: '#0088FE' },
    { name: 'Survey Fees', value: surveyFees, color: '#8884d8' },
    { name: 'Stamp Duty', value: stampDutyPaid, color: '#00C49F' },
    { name: 'Legal Fees', value: purchaseLegalFees, color: '#FFBB28' },
  ];

  return (
    <section className="ReturnsContainer-section">
      <header className="ReturnsContainer-header" onClick={headerClicked}>
        <h3>Day One Payment</h3>
        <Icon type="caret-down" className="u-floatRight"/>
      </header>
      <div className="ReturnsContainer-values">
        <div className="ReturnsContainer-valuesWrapper">
          <div className="ReturnsContainer-total">
            <span>Day one payment: </span>
            <span className="u-floatRight">{formatCurrency(dayOnePayment)}</span>
          </div>
          <div className="ReturnsContainer-depositPaid">
            <span>Deposit paid: </span>
            <span className="u-floatRight">{formatCurrency(depositPaid)}</span>
          </div>
          <div className="ReturnsContainer-stamDutyPaid">
            <span>Stamp duty (£): </span>
            <span className="u-floatRight">{formatCurrency(stampDutyPaid)}</span>
          </div>
          <div className="ReturnsContainer-stamDutyPercentage">
            <span>Stamp duty (%): </span>
            <span className="u-floatRight">{`${stampDuty}%`}</span>
          </div>
          <div className="ReturnsContainer-buyToLet">
            <span>Buy to let: </span>
            <span className="u-floatRight">{buyToLet ? 'Yes' : 'No'}</span>
          </div>
          <div className="ReturnsContainer-legalFees">
            <span>Legal Fees: </span>
            <span className="u-floatRight">{formatCurrency(purchaseLegalFees)}</span>
          </div>
          <div className="ReturnsContainer-brokerFee">
            <span>Broker Fee: </span>
            <span className="u-floatRight">{formatCurrency(brokerFee)}</span>
          </div>
          <div className="ReturnsContainer-surveyFees">
            <span>Survey Fees: </span>
            <span className="u-floatRight">{formatCurrency(surveyFees)}</span>
          </div>
          <div className="ReturnsContainer-chart">
            <ResponsiveContainer height={250}>
              <PieChart width={250} height={250}>
                <Pie
                  data={data}
                  isAnimationActive={false}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#82ca9d"
                  label={({name, value})=>`${name}: ${formatCurrency(value)}`}>{
                    data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

DayOnePayment.propTypes = {
  buyToLet: PropTypes.bool,
  price: PropTypes.number,
  stampDuty: PropTypes.number,
  purchaseAgentFees: PropTypes.number,
  purchaseLegalFees: PropTypes.number,
  surveyFees: PropTypes.number,
  brokerFee: PropTypes.number,
  deposit: PropTypes.number,
  headerClicked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buyToLet: state.purchaseInputs.buyToLet,
  price: state.purchaseInputs.price,
  stampDuty: state.purchaseInputs.stampDuty,
  purchaseAgentFees: state.purchaseInputs.purchaseAgentFees,
  purchaseLegalFees: state.purchaseInputs.purchaseLegalFees,
  surveyFees: state.purchaseInputs.surveyFees,
  brokerFee: state.mortgageInputs.brokerFee,
  deposit: state.mortgageInputs.deposit,
});

export default connect(
  mapStateToProps,
)(DayOnePayment);
