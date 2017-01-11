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

export function updatePrice(price) {
  return {
    type: UPDATE_PRICE,
    payload: price,
  };
}

export function updateStampDuty(stampDuty) {
  return {
    type: UPDATE_STAMP_DUTY,
    payload: stampDuty,
  };
}

export function updateBuyToLet(buyToLet) {
  return {
    type: UPDATE_BUY_TO_LET,
    payload: buyToLet,
  };
}

export function updateSurveyFees(surveyFees) {
  return {
    type: UPDATE_SURVEY_FEES,
    payload: surveyFees,
  };
}

export function updatePurchaseLegalFees(purchaseLegalFees) {
  return {
    type: UPDATE_PURCHASE_LEGAL_FEES,
    payload: purchaseLegalFees,
  };
}

export function updatePurchaseAgentFees(purchaseAgentFees) {
  return {
    type: UPDATE_PURCHASE_AGENT_FEES,
    payload: purchaseAgentFees,
  };
}

export function updateHoldPeriod(holdPeriod) {
  return {
    type: UPDATE_HOLD_PERIOD,
    payload: holdPeriod,
  };
}

export function updateGrowth(growth) {
  return {
    type: UPDATE_GROWTH,
    payload: growth,
  };
}

export function updateRentalIncome(rentalIncome) {
  return {
    type: UPDATE_RENTAL_INCOME,
    payload: rentalIncome,
  };
}

export function updateSaleLegalFees(saleLegalFees) {
  return {
    type: UPDATE_SALE_LEGAL_FEES,
    payload: saleLegalFees,
  };
}

export function updateSaleAgentFees(saleAgentFees) {
  return {
    type: UPDATE_SALE_AGENT_FEES,
    payload: saleAgentFees,
  };
}