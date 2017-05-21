import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

function DayOnePayment ({ calculations, headerClicked }) {
  const {
    buyToLet,
    purchaseLegalFees,
    surveyFees,
    brokerFee,
    stampDuty,
    dayOnePayment,
    depositPaid,
    stampDutyPaid,
    allInBorrowerCosts,
    bankCosts,
    interestPaid,
    amortisationPaid,
  } = calculations;

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
        <Icon type="caret-right" className="u-floatRight"/>
      </header>
      <div className="ReturnsContainer-values">
        <ul>
          <li className="ReturnsContainer-allInCosts">
            <span>All in borrower costs: </span>
            <span className="u-floatRight">{formatCurrency(allInBorrowerCosts)}</span>
          </li>
          <li className="ReturnsContainer-total">
            <span>Day one payment: </span>
            <span className="u-floatRight">{formatCurrency(dayOnePayment)}</span>
          </li>
          <li className="ReturnsContainer-depositPaid">
            <span>Deposit paid: </span>
            <span className="u-floatRight">{formatCurrency(depositPaid)}</span>
          </li>
          <li className="ReturnsContainer-stamDutyPaid">
            <span>Stamp duty (£): </span>
            <span className="u-floatRight">{formatCurrency(stampDutyPaid)}</span>
          </li>
          <li className="ReturnsContainer-stamDutyPercentage">
            <span>Stamp duty (%): </span>
            <span className="u-floatRight">{`${stampDuty}%`}</span>
          </li>
          <li className="ReturnsContainer-buyToLet">
            <span>Buy to let: </span>
            <span className="u-floatRight">{buyToLet ? 'Yes' : 'No'}</span>
          </li>
          <li className="ReturnsContainer-legalFees">
            <span>Legal Fees: </span>
            <span className="u-floatRight">{formatCurrency(purchaseLegalFees)}</span>
          </li>
          <li className="ReturnsContainer-brokerFee">
            <span>Broker Fee: </span>
            <span className="u-floatRight">{formatCurrency(brokerFee)}</span>
          </li>
          <li className="ReturnsContainer-surveyFees">
            <span>Survey Fees: </span>
            <span className="u-floatRight">{formatCurrency(surveyFees)}</span>
          </li>
          <li className="ReturnsContainer-bankCosts">
            <span>Bank costs: </span>
            <span className="u-floatRight">{formatCurrency(bankCosts)}</span>
          </li>
          <li className="ReturnsContainer-interestPaid">
            <span>Interest: </span>
            <span className="u-floatRight">{formatCurrency(interestPaid)}</span>
          </li>
          <li className="ReturnsContainer-amortisation">
            <span>Loan amortisation: </span>
            <span className="u-floatRight">{formatCurrency(amortisationPaid)}</span>
          </li>
          <li className="ReturnsContainer-chart">
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
          </li>
        </ul>
      </div>
    </section>
  );
}

DayOnePayment.propTypes = {
  calculations: PropTypes.object.isRequired,
  headerClicked: PropTypes.func.isRequired,
};

export default DayOnePayment;
