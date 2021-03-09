import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 마우스 이벤트가 payload에 들어가지 않도록 ()=> undefined 추가
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초 delay
  yield put(increase()); // 특정 액션 디스패치
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // takeEvery : 들어오는 모든 액션에 대해 특정 작업을 ㅓ리
  yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // takeLatest : 기존에 진행 중이던 작업 취소, 가장 마지막에 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// Redux Thunk 구문
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState,
);

export default counter;
