import {
  UPDATE_DEPOSIT,
  UPDATE_INTEREST_RATE,
  UPDATE_BROKER_FEE,
  UPDATE_LOAN_TYPE,
  UPDATE_TERM,
  UPDATE_GOVERNMENT_LOAN,
  UPDATE_MORTGAGE_SIZE,
  UPDATE_HOUSEHOLD_INCOME,
} from '../constants';

const initialState = {
  deposit: 20,
  interestRate: 1.5,
  brokerFee: 500,
  loanType: 'amortising',
  term: 30,
  governmentLoan: 0,
  mortgageSize: 80,
  householdIncome: 90000,
};

const purchaseInputs = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DEPOSIT:
      return {
        ...state,
        deposit: action.payload,
      };
    case UPDATE_INTEREST_RATE:
      return {
        ...state,
        interestRate: action.payload,
      };
    case UPDATE_BROKER_FEE:
      return {
        ...state,
        brokerFee: action.payload,
      };
    case UPDATE_LOAN_TYPE:
      return {
        ...state,
        loanType: action.payload,
      };
    case UPDATE_TERM:
      return {
        ...state,
        term: action.payload,
      };
    case UPDATE_GOVERNMENT_LOAN:
      return {
        ...state,
        governmentLoan: action.payload,
      };
    case UPDATE_MORTGAGE_SIZE:
      return {
        ...state,
        mortgageSize: action.payload,
      };
    case UPDATE_HOUSEHOLD_INCOME:
      return {
        ...state,
        householdIncome: action.payload,
      };
    default:
      return state;
  }
};

export default purchaseInputs;
