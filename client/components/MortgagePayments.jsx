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

import formatCurrency from '../utils/formatCurrency';
import {
  calculateLoanAmount,
  calculateDeposit,
  calculateMortgagePayments,
  calculateInterestAndAmortisation,
} from '../utils/calculatePropertyReturns';

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
      <div>
        <span>Loan Amount: </span>
        <span className="MortgagePayments-loanAmount">{formatCurrency(loanAmount)}</span>
      </div>
      <div>
        <span>Deposit ({deposit}%): </span>
        <span className="MortgagePayments-deposit">{formatCurrency(depositPaid)}</span>
      </div>
      <div>
        <span>Mortgage term: </span>
        <span className="MortgagePayments-term">{term} years</span>
      </div>
      <div>
        <span>Broker fee: </span>
        <span className="MortgagePayments-brokerFee">{formatCurrency(brokerFee)}</span>
      </div>
      <div>
        <span>Monthly payments: </span>
        <span className="MortgagePayments-monthlyPayments">{formatCurrency(monthlyPayments)}</span>
      </div>
      <div>
        <span>Annual payments: </span>
        <span className="MortgagePayments-annualPayments">{formatCurrency(annualPayments)}</span>
      </div>
      <div>
        <span>Interest rate: </span>
        <span className="MortgagePayments-interestRate">{interestRate}%</span>
      </div>
      <div>
        <span>Mortgage type: </span>
        <span className="MortgagePayments-mortgageType">{capitalize(loanType)}</span>
      </div>
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
