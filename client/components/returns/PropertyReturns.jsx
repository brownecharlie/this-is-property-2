import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

function PropertyReturns({ calculations, headerClicked }) {
  const {
    price,
    growth,
    holdPeriod,
    adminDistrict,
    fiveYearGrowth,
    salePrice,
    saleCosts,
    purchaseCosts,
    totalMortgagePayment,
    totalRentalIncome,
    profit,
    profitOnCost,
    governmentProfit,
    ownersProfit,
    governmentLoanInterest,
    returnOnEquity,
  } = calculations;

  const data = [
    { name: 'Assumed Growth', value: growth, color: '#0088FE' },
    { name: 'Projected Growth', value: fiveYearGrowth, color: '#00C49F' },
  ];

  return (
    <section className="ReturnsContainer-section is-active">
      <header className="ReturnsContainer-header" onClick={headerClicked}>
        <h3>Property Returns</h3>
        <Icon type="caret-down" className="u-floatRight"/>
      </header>
      <div className="ReturnsContainer-values">
        <ul>
          <li className="ReturnsContainer-profit">
            <span>Profit on cost: </span>
            <span className="u-floatRight">{profitOnCost.toFixed(2)}%</span>
          </li>
          <li className="ReturnsContainer-returnOnEquity">
            <span>Return on equity: </span>
            <span className="u-floatRight">{returnOnEquity.toFixed(2)}%</span>
          </li>
          <li className="ReturnsContainer-profit">
            <span>Profit: </span>
            <span className="u-floatRight">{formatCurrency(profit)}</span>
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
            <span>Sale price: </span>
            <span className="u-floatRight">{formatCurrency(salePrice)}</span>
          </li>
          <li className="ReturnsContainer-saleCosts">
            <span>Sale costs: </span>
            <span className="u-floatRight">{formatCurrency(saleCosts)}</span>
          </li>
          <li className="ReturnsContainer-price">
            <span>Purchase price: </span>
            <span className="u-floatRight">{formatCurrency(price)}</span>
          </li>
          <li className="ReturnsContainer-costs">
            <span>Purchase costs: </span>
            <span className="u-floatRight">{formatCurrency(purchaseCosts)}</span>
          </li>
          <li className="ReturnsContainer-mortgagePayments">
            <span>Mortgage payments: </span>
            <span className="u-floatRight">{formatCurrency(totalMortgagePayment)}</span>
          </li>
          <li className="ReturnsContainer-governmentLoanInterest">
            <span>Government loan interest: </span>
            <span className="u-floatRight">{formatCurrency(governmentLoanInterest)}</span>
          </li>
          <li className="ReturnsContainer-rentalIncome">
            <span>Rental income: </span>
            <span className="u-floatRight">{formatCurrency(totalRentalIncome)}</span>
          </li>
          <li className="ReturnsContainer-holdPeriod">
            <span>Hold period (years): </span>
            <span className="u-floatRight">{`${holdPeriod} years`}</span>
          </li>
          <li className="ReturnsContainer-holdPeriod">
            <span>Growth (% p.a.): </span>
            <span className="u-floatRight">{`${growth}%`}</span>
            <span>5 year average growth in {adminDistrict}</span>
            <ResponsiveContainer height={230}>
              <BarChart width={300} height={230} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="5 5" />
                <Bar dataKey="value" isAnimationActive={false}>
                {
                  data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
                }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </li> : null
          }
        </ul>
      </div>
    </section>
  );
}

PropertyReturns.propTypes = {
  calculations: PropTypes.object.isRequired,
  headerClicked: PropTypes.func.isRequired,
};

export default PropertyReturns;
