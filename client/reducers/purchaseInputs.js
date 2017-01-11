import {
  UPDATE_PRICE,
  UPDATE_STAMP_DUTY,
  UPDATE_BUY_TO_LET,
  UPDATE_SURVEY_FEES,
  UPDATE_PURCHASE_LEGAL_FEES,
  UPDATE_PURCHASE_AGENT_FEES,
  UPDATE_HOLD_PERIOD,
  UPDATE_GROWTH,
  UPDATE_RENTAL_INCOME,
  UPDATE_SALE_LEGAL_FEES,
  UPDATE_SALE_AGENT_FEES,
} from '../constants';

const initialState = {
  price: 450000,
  stampDuty: 2.78,
  buyToLet: false,
  holdPeriod: 5,
  growth: 8,
  rentalIncome: 0,
  surveyFees: 500,
  purchaseLegalFees: 500,
  purchaseAgentFees: 0,
  saleLegalFees: 500,
  saleAgentFees: 1,
};

const purchaseInputs = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRICE:
      return {
        ...state,
        price: action.payload,
      };
    case UPDATE_STAMP_DUTY:
      return {
        ...state,
        stampDuty: action.payload,
      };
    case UPDATE_BUY_TO_LET:
      return {
        ...state,
        buyToLet: action.payload,
      };
    case UPDATE_SURVEY_FEES:
      return {
        ...state,
        surveyFees: action.payload,
      };
    case UPDATE_PURCHASE_LEGAL_FEES:
      return {
        ...state,
        purchaseLegalFees: action.payload,
      };
    case UPDATE_PURCHASE_AGENT_FEES:
      return {
        ...state,
        purchaseAgentFees: action.payload,
      };
    case UPDATE_HOLD_PERIOD:
      return {
        ...state,
        holdPeriod: action.payload,
      };
    case UPDATE_GROWTH:
      return {
        ...state,
        growth: action.payload,
      };
    case UPDATE_RENTAL_INCOME:
      return {
        ...state,
        rentalIncome: action.payload,
      };
    case UPDATE_SALE_LEGAL_FEES:
      return {
        ...state,
        saleLegalFees: action.payload,
      };
    case UPDATE_SALE_AGENT_FEES:
      return {
        ...state,
        saleAgentFees: action.payload,
      };
    default:
      return state;
  }
};

export default purchaseInputs;
