// root 리듀서 만들기 -> 리덕스에서 제공하는 combineReducers 유틸 함수 사용
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
