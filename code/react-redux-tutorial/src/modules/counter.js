import { createAction, handleActions } from 'redux-actions';

// 액션 타입 설정
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수 설정
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// createAction을 이용해 액션 생성 함수 설정
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기값 설정
const initialState = {
  number: 0,
};

// 리듀서 함수 설정
// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

// handleActions를 이용한 리듀서 함수 설정
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
