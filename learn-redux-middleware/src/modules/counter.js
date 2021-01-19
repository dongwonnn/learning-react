import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 특정 액션을 디스패치
  const number = yield select((state) => state.counter);
  console.log(`현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* conuterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리
  // 두번 클릭하면 두번 다 실행
  yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소하고 가장 마지막으로 실행된 작업만 수행
  // 두번 클릭해도 한번만 실행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

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

// export const increase = () => ({type : INCREASE})
// export const decrease = () => ({type : DECREASE})

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState,
);

// function counter(state = initialState, action) {
//     switch(action.type){
//         case INCREASE :
//             return { number : state.number + 1}
//         case DECREASE :
//             return { number : state.number - 1}
//         default :
//             return state;
//     }
// }

export default counter;
