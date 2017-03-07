import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

import formatCurrency from '../../utils/formatCurrency';
import {
  calculateLoanAmount,
  calculateDeposit,
  calculateMortgagePayments,
  calculateInterestAndAmortisation,
} from '../../utils/calculatePropertyReturns';

function MortgagePayments ({ price, brokerFee, deposit, interestRate, loanType, term, headerClicked }) {
  const loanAmount = calculateLoanAmount(price, deposit);
  const depositPaid = calculateDeposit(price, deposit);
  const monthlyPayments = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly;
  const annualPayments = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly * 12;
  const interestAndAmortisation = calculateInterestAndAmortisation(loanAmount, annualPayments, interestRate, term);

  const capitalize = string => [...string].map(
      (char, index) => index ? char : char.toUpperCase()
   ).join('');

  return (
    <section className="ReturnsContainer-section">
      <header className="ReturnsContainer-header" onClick={headerClicked}>
        <h3>Mortgage Payments</h3>
        <Icon type="caret-down" className="u-floatRight"/>
      </header>
      <div className="ReturnsContainer-values">
        <ul>
          <li className="ReturnsContainer-loanAmount">
            <span>Loan Amount: </span>
            <span className="u-floatRight">{formatCurrency(loanAmount)}</span>
          </li>
          <li className="ReturnsContainer-deposit">
            <span>Deposit ({deposit}%): </span>
            <span className="u-floatRight">{formatCurrency(depositPaid)}</span>
          </li>
          <li className="ReturnsContainer-term">
            <span>Mortgage term: </span>
            <span className="u-floatRight">{term} years</span>
          </li>
          <li className="ReturnsContainer-brokerFee">
            <span>Broker fee: </span>
            <span className="u-floatRight">{formatCurrency(brokerFee)}</span>
          </li>
          <li className="ReturnsContainer-monthlyPayments">
            <span>Monthly payments: </span>
            <span className="u-floatRight">{formatCurrency(monthlyPayments)}</span>
          </li>
          <li className="ReturnsContainer-annualPayments">
            <span>Annual payments: </span>
            <span className="u-floatRight">{formatCurrency(annualPayments)}</span>
          </li>
          <li className="ReturnsContainer-interestRate">
            <span>Interest rate: </span>
            <span className="u-floatRight">{interestRate}%</span>
          </li>
          <li className="ReturnsContainer-mortgageType">
            <span>Mortgage type: </span>
            <span className="u-floatRight">{capitalize(loanType)}</span>
          </li>
          <li className="ReturnsContainer-chart">
            <ResponsiveContainer height={300}>
              <LineChart
                width={730}
                height={250}
                data={interestAndAmortisation}
                margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
              >
                <XAxis dataKey="year" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="interest"
                  stroke="#8884d8"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="amortisation"
                  stroke="#82ca9d"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </li>
        </ul>
      </div>
    </section>
  );
}

MortgagePayments.propTypes = {
  price: PropTypes.number,
  brokerFee: PropTypes.number,
  deposit: PropTypes.number,
  interestRate: PropTypes.number,
  loanType: PropTypes.string,
  term: PropTypes.number,
  headerClicked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  price: state.purchaseInputs.price,
  brokerFee: state.mortgageInputs.brokerFee,
  deposit: state.mortgageInputs.deposit,
  interestRate: state.mortgageInputs.interestRate,
  loanType: state.mortgageInputs.loanType,
  term: state.mortgageInputs.term,
});

export default connect(
  mapStateToProps,
)(MortgagePayments);
