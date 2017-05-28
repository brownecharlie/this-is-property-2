import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { findDOMNode } from 'react-dom';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style/css';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

function PropertyReturns({ calculations, headerClicked }) {
  const {
    price,
    growth,
    holdPeriod,
    saleLegalFees,
    actualSaleAgentFees,
    actualPurchaseAgentFees,
    purchaseLegalFees,
    surveyFees,
    rentalIncome,
    stampDutyPaid,
    adminDistrict,
    fiveYearGrowth,
    salePrice,
    saleCosts,
    purchaseCosts,
    totalMortgagePayment,
    totalRentalIncome,
    profit,
    totalCosts,
    profitOnCost,
    governmentProfit,
    ownersProfit,
    governmentLoanInterest,
    returnOnEquity,
    allInBorrowerCosts,
  } = calculations;

  const data = [
    { name: 'Assumed Growth', value: growth, color: 'rgb(141, 201, 195)' },
    { name: 'Projected Growth', value: fiveYearGrowth, color: 'rgb(70, 147, 140)' },
  ];

  const salePricePopoverContent = (
    <p>{growth}% growth over {holdPeriod} years.</p>
  );

  const saleCostsPopoverContent = (
    <div>
      <p>Sale Agents Fees: {formatCurrency(actualSaleAgentFees)}</p>
      <p>Sale Legal Fees: {formatCurrency(saleLegalFees)}</p>
    </div>
  );

  const purchaseCostsPopoverContent = (
    <div>
      <p>Stamp Duty: {formatCurrency(stampDutyPaid)}</p>
      <p>Agents Fees: {formatCurrency(actualPurchaseAgentFees)}</p>
      <p>Legal Fees: {formatCurrency(purchaseLegalFees)}</p>
      <p>Survey Fees: {formatCurrency(surveyFees)}</p>
    </div>
  );

  const profitOnCostPopoverContent = (
    <p>Total Profit ({formatCurrency(profit)}) / Total Costs ({formatCurrency(totalCosts)}).</p>
  );

  const returnOnEquityPopoverContent = (
    <p>Owners' Profit ({formatCurrency(ownersProfit)}) / All In Borrower Costs ({formatCurrency(allInBorrowerCosts)}).</p>
  );

  const rentalIncomePopoverContent = (
    <p>{formatCurrency(rentalIncome)} per month over {holdPeriod} years.</p>
  );

  const governmentLoanInterestPopoverContent = (
    <p>The help to buy equity loan will charge 1.75% p.a. on the amount drawn after 5 years</p>
  );

  return (
    <section className="ReturnsContainer-section is-active">
      <header className="ReturnsContainer-header" onClick={headerClicked}>
        <h3>Property Returns</h3>
        <Icon type="caret-right" className="u-floatRight"/>
      </header>
      <div className="ReturnsContainer-values">
        <ul>
          <li className="ReturnsContainer-profit">
            <span>Profit: </span>
            <span className="u-floatRight">{formatCurrency(profit)}</span>
          </li>
          <li className="ReturnsContainer-profitOnCost">
            <span>
              Profit on cost:
              <Popover
                content={profitOnCostPopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{profitOnCost.toFixed(2)}%</span>
          </li>
          <li className="ReturnsContainer-returnOnEquity">
            <span>
              Return on equity:
              <Popover
                content={returnOnEquityPopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{returnOnEquity.toFixed(2)}%</span>
          </li>
          <li className="ReturnsContainer-ownersProfit">
            <span>Owners profit: </span>
            <span className="u-floatRight">{formatCurrency(ownersProfit)}</span>
          </li>
          <li className="ReturnsContainer-governmentProfit">
            <span>Government profit: </span>
            <span className="u-floatRight">{formatCurrency(governmentProfit)}</span>
          </li>
          <li className="ReturnsContainer-salePrice">
            <span>
              Sale price: 
              <Popover
                content={salePricePopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{formatCurrency(salePrice)}</span>
          </li>
          <li className="ReturnsContainer-saleCosts">
            <span>
              Sale costs: 
              <Popover
                content={saleCostsPopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{formatCurrency(saleCosts)}</span>
          </li>
          <li className="ReturnsContainer-price">
            <span>Purchase price: </span>
            <span className="u-floatRight">{formatCurrency(price)}</span>
          </li>
          <li className="ReturnsContainer-costs">
            <span>
              Purchase costs: 
              <Popover
                content={purchaseCostsPopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{formatCurrency(purchaseCosts)}</span>
          </li>
          <li className="ReturnsContainer-mortgagePayments">
            <span>Mortgage payments: </span>
            <span className="u-floatRight">{formatCurrency(totalMortgagePayment)}</span>
          </li>
          <li className="ReturnsContainer-governmentLoanInterest">
            <span>
              Government loan interest:
              <Popover
                content={governmentLoanInterestPopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{formatCurrency(governmentLoanInterest)}</span>
          </li>
          <li className="ReturnsContainer-rentalIncome">
            <span>
              Rental income: 
              <Popover
                content={rentalIncomePopoverContent}
                overlayClassName="Popover"
              >
                <Icon type="info-circle-o" />
              </Popover>
            </span>
            <span className="u-floatRight">{formatCurrency(totalRentalIncome)}</span>
          </li>
          <li className="ReturnsContainer-holdPeriod">
            <span>Hold period (years): </span>
            <span className="u-floatRight">{`${holdPeriod} years`}</span>
          </li>
          <li className="ReturnsContainer-growth">
            <span>Growth (% p.a.): </span>
            <span className="u-floatRight">{`${growth}%`}</span>
          </li>
        </ul>
        <div className="ReturnsContainer-graph">
          {/** <span>5 year average growth in {adminDistrict}</span> **/}
          <ResponsiveContainer height={410}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={value => `${value}%`}
              />
              <Bar
                dataKey="value"
                
                isAnimationActive={false}
              >{data.map((entry, index) => (
                <Cell key={index} fill={entry.color}/>
              ))}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

PropertyReturns.propTypes = {
  calculations: PropTypes.object.isRequired,
  headerClicked: PropTypes.func.isRequired,
};

export default PropertyReturns;
