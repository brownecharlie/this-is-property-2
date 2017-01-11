import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

import formatCurrency from '../utils/formatCurrency';
import {
  calculateSalePrice,
  calculateSaleCosts,
  calculatePurchaseCosts,
  calculateMortgagePayments,
  calculateTotalMortgagePayment,
  calculateTotalRentalIncome,
  calculateProfit,
  calculateDayOnePayment,
  calculateDeposit,
  calculateStampDuty,
} from '../utils/calculatePropertyReturns';

class PropertyReturns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fiveYearGrowth: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { propertyListings } = this.props;

    if (propertyListings !== nextProps.propertyListings) {
      const { latitude: lat, longitude: lon } = nextProps.propertyListings;

      Meteor.call('getAdminDistrict', { lat, lon }, (err, result) => {
        if (err) { console.log(err); return; }

        const adminDistrict = result.data.result[0].admin_district;

        Meteor.call('getAveragePrices', adminDistrict, (err, result) => {
          if (err) { console.log(err); return; }

          const items = result.data.result.items;
          const fiveYearGrowth = (items[47].annualChange + items[35].annualChange + 
                                  items[23].annualChange + items[11].annualChange + 
                                  items[0].annualChange) / 5;

          this.setState({ fiveYearGrowth });
        });
      });
    }
  }

  render() {
    const {
      growth,
      holdPeriod,
      price,
      saleAgentFees,
      saleLegalFees,
      purchaseAgentFees,
      purchaseLegalFees,
      surveyFees,
      rentalIncome,
      brokerFee,
      stampDuty,
      deposit,
      loanType,
      interestRate,
      term,
      buyToLet,
    } = this.props;

    const salePrice = calculateSalePrice(growth, holdPeriod, price);
    const saleCosts = calculateSaleCosts(saleAgentFees, salePrice, saleLegalFees);
    const purchaseCosts = calculatePurchaseCosts(purchaseAgentFees, price, purchaseLegalFees, surveyFees, stampDuty, price);
    const monthlyMortgagePayment = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly;
    const totalMortgagePayment = calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod);
    const totalRentalIncome = calculateTotalRentalIncome(rentalIncome, holdPeriod);
    const profit = calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, totalRentalIncome);

    const data = [
      { name: 'Assumned Growth', value: growth, color: '#0088FE' },
      { name: 'Projected Growth', value: this.state.fiveYearGrowth, color: '#00C49F' },
    ];

    return (
      <div className="PropertyReturns">
        <div>
          <span>Profit: </span>
          <span className="PropertyReturns-profit">{formatCurrency(profit)}</span>
        </div>
        <div>
          <span>Sale price: </span>
          <span className="PropertyReturns-salePrice">{formatCurrency(salePrice)}</span>
        </div>
        <div>
          <span>Sale costs: </span>
          <span className="PropertyReturns-saleCosts">{formatCurrency(saleCosts)}</span>
        </div>
        <div>
          <span>Purchase price: </span>
          <span className="PropertyReturns-price">{formatCurrency(price)}</span>
        </div>
        <div>
          <span>Purchase costs: </span>
          <span className="PropertyReturns-costs">{formatCurrency(purchaseCosts)}</span>
        </div>
        <div>
          <span>Mortgage payments: </span>
          <span className="PropertyReturns-mortgagePayments">{formatCurrency(totalMortgagePayment)}</span>
        </div>
        <div>
          <span>Rental income: </span>
          <span className="PropertyReturns-rentalIncome">{formatCurrency(totalRentalIncome)}</span>
        </div>
        <div>
          <span>Hold period: </span>
          <span className="PropertyReturns-holdPeriod">{`${holdPeriod} years`}</span>
        </div>
        <div>
          <span>Growth (p/a): </span>
          <span className="PropertyReturns-holdPeriod">{`${growth}%`}</span>
        </div>
        <div>
          <span>Buy to let: </span>
          <span className="PropertyReturns-buyToLet">{buyToLet ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <span>Stamp duty: </span>
          <span className="PropertyReturns-stamDuty">{`${stampDuty}%`}</span>
        </div>
        {this.state.fiveYearGrowth ?
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
          : null
        }
      </div>
    );
  }
}

PropertyReturns.propTypes = {
  holdPeriod: PropTypes.number,
  growth: PropTypes.number,
  price: PropTypes.number,
  stampDuty: PropTypes.number,
  saleAgentFees: PropTypes.number,
  saleLegalFees: PropTypes.number,
  purchaseAgentFees: PropTypes.number,
  purchaseLegalFees: PropTypes.number,
  surveyFees: PropTypes.number,
  rentalIncome: PropTypes.number,
  brokerFee: PropTypes.number,
  deposit: PropTypes.number,
  loanType: PropTypes.string,
  interestRate: PropTypes.number,
  term: PropTypes.number,
  buyToLet: PropTypes.bool,
  propertyListings: PropTypes.object,
};

const mapStateToProps = (state) => ({
  holdPeriod: state.purchaseInputs.holdPeriod,
  growth: state.purchaseInputs.growth,
  price: state.purchaseInputs.price,
  stampDuty: state.purchaseInputs.stampDuty,
  saleAgentFees: state.purchaseInputs.saleAgentFees,
  saleLegalFees: state.purchaseInputs.saleLegalFees,
  purchaseAgentFees: state.purchaseInputs.purchaseAgentFees,
  purchaseLegalFees: state.purchaseInputs.purchaseLegalFees,
  surveyFees: state.purchaseInputs.surveyFees,
  rentalIncome: state.purchaseInputs.rentalIncome,
  brokerFee: state.mortgageInputs.brokerFee,
  deposit: state.mortgageInputs.deposit,
  loanType: state.mortgageInputs.loanType,
  interestRate: state.mortgageInputs.interestRate,
  term: state.mortgageInputs.term,
  buyToLet: state.purchaseInputs.buyToLet,
  propertyListings: state.propertyListings,
});

export default connect(
  mapStateToProps,
)(PropertyReturns);
