// 스토어의 값 불러오기, 디스패치하기
// 리덕스 스토어와 연동된 컴포넌트 = 컨테이너

import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
// 컨테이너를 리덕스와 연동하려면 react-redux에서 제공하는 connect 함수 사용해야한다.
// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
import { increase, decrease } from '../modules/counter';

// dispatch를 자동으로 설정해주는 유틸함수
// 두 번째 파라미터를 객체형식으로 넣으면 connect 함수가 자동으로 해준다.
// import { bindActionCreators } from 'redux';

import { useSelector, useDispatch } from 'react-redux';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    // <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease,
  },
)(CounterContainer);

// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   (dispatch) => ({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease()),
//   }),
// )(CounterContainer);

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

// const mapDispatchToProps = (dispatch) => ({
//   increase: () => dispatch(increase()),
//   decrease: () => dispatch(decrease()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
