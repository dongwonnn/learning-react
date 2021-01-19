import { combineReducers } from 'redux';
import counter, { conuterSaga } from './counter';
import sample, { sampleSaga } from './sample';
import loading from './loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  // all을 통해 여러 사가를 합쳐 주는 역할
  yield all([conuterSaga(), sampleSaga()]);
}

export default rootReducer;
