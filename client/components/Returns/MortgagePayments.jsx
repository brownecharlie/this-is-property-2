import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
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

function MortgagePayments ({ price, brokerFee, deposit, interestRate, loanType, term }) {
  const loanAmount = calculateLoanAmount(price, deposit);
  const depositPaid = calculateDeposit(price, deposit);
  const monthlyPayments = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly;
  const annualPayments = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly * 12;
  const interestAndAmortisation = calculateInterestAndAmortisation(loanAmount, annualPayments, interestRate, term);

  const capitalize = string => [...string].map(
      (char, index) => index ? char : char.toUpperCase()
   ).join('');

  return (
    <div className="MortgagePayments">
      <h2 className="MortgagePayments-title">Mortgage Payments</h2>
      <div className="MortgagePayments-loanAmount">
        <span>Loan Amount: </span>
        <span className="u-floatRight">{formatCurrency(loanAmount)}</span>
      </div>
      <div className="MortgagePayments-deposit">
        <span>Deposit ({deposit}%): </span>
        <span className="u-floatRight">{formatCurrency(depositPaid)}</span>
      </div>
      <div className="MortgagePayments-term">
        <span>Mortgage term: </span>
        <span className="u-floatRight">{term} years</span>
      </div>
      <div className="MortgagePayments-brokerFee">
        <span>Broker fee: </span>
        <span className="u-floatRight">{formatCurrency(brokerFee)}</span>
      </div>
      <div className="MortgagePayments-monthlyPayments">
        <span>Monthly payments: </span>
        <span className="u-floatRight">{formatCurrency(monthlyPayments)}</span>
      </div>
      <div className="MortgagePayments-annualPayments">
        <span>Annual payments: </span>
        <span className="u-floatRight">{formatCurrency(annualPayments)}</span>
      </div>
      <div className="MortgagePayments-interestRate">
        <span>Interest rate: </span>
        <span className="u-floatRight">{interestRate}%</span>
      </div>
      <div className="MortgagePayments-mortgageType">
        <span>Mortgage type: </span>
        <span className="u-floatRight">{capitalize(loanType)}</span>
      </div>
      <div className="MortgagePayments-chart">
        <ResponsiveContainer height={300}>
          <LineChart
            width={730}
            height={250}
            data={interestAndAmortisation}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
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
      </div>
    </div>
  );
}

MortgagePayments.propTypes = {
  price: PropTypes.number,
  brokerFee: PropTypes.number,
  deposit: PropTypes.number,
  interestRate: PropTypes.number,
  loanType: PropTypes.string,
  term: PropTypes.number,
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
