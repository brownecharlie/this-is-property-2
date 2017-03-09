import {
  UPDATE_DEPOSIT,
  UPDATE_INTEREST_RATE,
  UPDATE_BROKER_FEE,
  UPDATE_LOAN_TYPE,
  UPDATE_TERM,
  UPDATE_GOVERNMENT_LOAN,
} from '../constants';

export function updateDeposit(deposit) {
  return {
    type: UPDATE_DEPOSIT,
    payload: deposit,
  };
}

export function updateInterestRate(interestRate) {
  return {
    type: UPDATE_INTEREST_RATE,
    payload: interestRate,
  };
}

export function updateBrokerFee(brokerFee) {
  return {
    type: UPDATE_BROKER_FEE,
    payload: brokerFee,
  };
}

export function updateLoanType(loanType) {
  return {
    type: UPDATE_LOAN_TYPE,
    payload: loanType,
  };
}

export function updateTerm(term) {
  return {
    type: UPDATE_TERM,
    payload: term,
  };
}

export function updateGovernmentLoan(governmentLoan) {
  return {
    type: UPDATE_GOVERNMENT_LOAN,
    payload: governmentLoan,
  };
}