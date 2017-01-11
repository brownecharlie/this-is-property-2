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

export function calculateLoanAmount(price, deposit) {
  return price - (price * deposit / 100);
}

export function calculateMortgagePayments(price, deposit, loanType, interestRate, term) {
  let monthly;
  let annual;

  const depositAmount = price * deposit / 100;
  const loanAmount = price - depositAmount;

  switch (loanType) {
    case 'amortising':
      monthly = -interestRate / 1200 * loanAmount * Math.pow((1 + interestRate / 1200), term * 12) / (1 - Math.pow((1 + interestRate / 1200), term * 12));
      annual = -interestRate / 100 * loanAmount * Math.pow((1 + interestRate / 100), term) / (1 - Math.pow((1 + interestRate / 100), term));
      break;
    case 'interest':
      monthly = interestRate / 1200 * loanAmount;
      annual = interestRate / 100 * loanAmount;
      break;
  }

  return {
    monthly,
    annual,
  };
}

export function calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod) {
  return (monthlyMortgagePayment * holdPeriod) * 12;
}

export function calculateTotalRentalIncome(rentalIncome, holdPeriod) {
  return (rentalIncome * 12) * holdPeriod;
}

export function calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, totalRentalIncome) {
  return salePrice - saleCosts - price - purchaseCosts - totalMortgagePayment - brokerFee + totalRentalIncome;
}

export function calculateDayOnePayment(deposit, purchaseAgentFees, stampDuty, price, purchaseLegalFees, surveyFees, brokerFee) {
  return (deposit + purchaseAgentFees + stampDuty) * price / 100 + purchaseLegalFees + surveyFees + brokerFee;
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

    arr.push({ interest, amortisation, loanRemaining, year });
  }

  return arr;
}