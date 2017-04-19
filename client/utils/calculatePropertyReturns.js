export function calculateSalePrice(growth, holdPeriod, price) {
  return Math.pow(1 + growth / 100, holdPeriod) * price;
}

export function calculateSaleCosts(saleAgentFees, salePrice, saleLegalFees) {
  return saleAgentFees * salePrice / 100 + saleLegalFees;
}

export function calculatePurchaseCosts(purchaseAgentFees, price, purchaseLegalFees, surveyFees, stampDuty, price) {
  return purchaseAgentFees * price / 100 + purchaseLegalFees + surveyFees + stampDuty * price / 100;
}

export function calculateDeposit(price, deposit) {
  return price * deposit / 100;
}

export function calculateStampDuty(stampDuty, price) {
  return stampDuty * price / 100;
}

export function calculateMortgageSize(governmentLoan, deposit) {
  return 100 - governmentLoan - deposit;
}

export function calculateLoanAmount(price, deposit) {
  return price - (price * deposit / 100);
}

export function calculateMortgagePayments(price, deposit, loanType, interestRate, term) {
  const depositAmount = price * deposit / 100;
  const loanAmount = price - depositAmount;

  switch (loanType) {
    case 'amortising':
      return -interestRate / 1200 * loanAmount * Math.pow((1 + interestRate / 1200), term * 12) / (1 - Math.pow((1 + interestRate / 1200), term * 12));
      break;
    case 'interest':
      return interestRate / 1200 * loanAmount;
      break;
  }
}

export function calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod, brokerFee) {
  return ((monthlyMortgagePayment * holdPeriod) * 12) + brokerFee;
}

export function calculateTotalRentalIncome(rentalIncome, holdPeriod) {
  return (rentalIncome * 12) * holdPeriod;
}

export function calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, governmentLoanInterest, totalRentalIncome) {
  return salePrice - (saleCosts + price + purchaseCosts + totalMortgagePayment + brokerFee + governmentLoanInterest) + totalRentalIncome;
}

export function calculateTotalCost(saleCosts, price, purchaseCosts, totalMortgagePayment, totalRentalIncome) {
  return saleCosts + price + purchaseCosts + totalMortgagePayment - totalRentalIncome;
}

export function calculateProfitOnCost(profit, totalCosts) {
  return profit / totalCosts * 100;
}

export function calculateReturnOnEquity(ownersProfit, allInBorrowerCosts) {
  return (ownersProfit / allInBorrowerCosts) * 100;
}

export function calculateGovernmentProfit(purchasePrice, salePrice, governmentLoan) {
  return ((salePrice - purchasePrice) * governmentLoan) / 100;
}

export function calculateOwnersProfit(profit, governmentProfit) {
  return profit - governmentProfit;
}

export function calculateBankCosts(interest, amortisation, brokerFee) {
  return interest + amortisation + brokerFee;
}

export function calculateAllInBorrowerCosts(dayOnePayment, bankCosts) {
  return dayOnePayment + bankCosts;
}

export function calculateDayOnePayment(deposit, purchaseAgentFees, stampDuty, price, purchaseLegalFees, surveyFees, brokerFee) {
  return (deposit + purchaseAgentFees + stampDuty) * price / 100 + purchaseLegalFees + surveyFees + brokerFee;
}

export function calculateGovernmentLoanInterest(governmentLoan, price, holdPeriod) {
  if (holdPeriod > 5) {
    return ((governmentLoan * price) / 100) * 0.0175 * (holdPeriod - 5);
  }
  return 0;
}

export function calculateInterestAndAmortisation(loanAmount, annualPayment, interestRate, term) {
  const arr = [];
  let interest;
  let amortisation;
  let loanRemaining;

  for (let i = 0; i <= term - 1; i++) {
    if (i === 0) {
      interest = loanAmount * interestRate / 100;
      amortisation = annualPayment - interest;
      loanRemaining = loanAmount - amortisation;
    } else {
      interest = arr[i - 1].loanRemaining * interestRate / 100;
      amortisation = annualPayment - interest;
      loanRemaining = arr[i - 1].loanRemaining - amortisation;
    }

    const year = `Y${i + 1}`;

    arr.push({
      interest,
      amortisation,
      loanRemaining,
      year,
    });
  }

  return arr;
}