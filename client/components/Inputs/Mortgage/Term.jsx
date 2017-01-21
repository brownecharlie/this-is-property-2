import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updateTerm } from '../../../actions/mortgageInputs';

class Term extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateTerm } = this.props;

    onUpdateTerm(value);
  }

  render() {
    const { term } = this.props;

    return (
      <div className="MortgageSection-term u-formInput">
        <span>Term </span>
        <Slider
          min={5}
          max={35}
          step={1}
          onChange={this.onChange}
          value={term}
          tipFormatter={value => `${value} years`}
        />
      </div>
    );
  }
}

Term.propTypes = {
  term: PropTypes.number,
};

const mapStateToProps = (state) => ({
  term: state.mortgageInputs.term,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateTerm(term) {
    dispatch(updateTerm(term));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Term);
