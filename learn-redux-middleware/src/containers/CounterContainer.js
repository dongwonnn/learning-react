import React from 'react';
import Counter from '../components/Counter';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import { connect } from 'react-redux';

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

export default connect(
  (state) => ({
    number: state.counter,
  }),
  {
    increaseAsync,
    decreaseAsync,
  },
)(CounterContainer);
