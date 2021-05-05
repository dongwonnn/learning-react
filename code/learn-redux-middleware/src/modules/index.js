import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import sample from './sample';
import { all } from 'redux-saga/effects';
import loading from './loading';

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  // all 함수 : 여러 사가를 합쳐 주는 역할
  yield all([counterSaga()]);
}

export default rootReducer;
