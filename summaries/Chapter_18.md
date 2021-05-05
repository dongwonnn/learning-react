# Chapter 18 : 리덕스 미들웨어를 통한 비동기 작업 관리

- API 서버를 연동할 때 API 요청에 대한 상태 관리를 잘 해야한다.
  - 요청이 시작 -> 로딩 중, 요청이 성공, 실패 -> 로딩 끝
  - 요청이 성공하면 서버에서 받아 온 응답에 대한 상태를 관리
  - 요청이 실패하면 서버에서 반환한 에러에 대한 상태 관리
  - 미들웨어를 통해 이러한 작업들을 효율적이고 편하게 상태 관리 가능

# 🎯 작업 환경 준비

- counter

# 🎯 미들웨어란 ?

- 리덕스 미들웨어는 액션을 디스패치했을 때 리듀서에서 이걸 처리하기에 앞서 **사전에 지정된 작업**들을 시행한다.
- 미들웨어는 **액션과 리듀서 사이의 중간자**
  - ex) 전달받은 액션을 단순히 콘솔에 기록, 전달 받은 액션 정보를 기반으로 액션을 취소, 다른 종류의 액션을 추가로 디스패치 ...

## 1. 미들웨어 만들기

- 미들웨어의 구조

  ```
  const loggerMiddleware = store => next => action => {
    ...
  }
  export default loggerMiddleware;
  ```

  - 화살표 함수를 쓰지 않으면

  ```
  const loggerMiddleware = function loggerMiddleware(store){
    return function(next){
      return function(action){
        ...
      }
    }
  }
  ```

- 미들웨어는 결국 함수를 반환하는 함수.

  - store는 리덕스 스토어 인스턴스
  - action은 디스패치된 액션
  - next는 store.dispatch와 비슷한 역할. 함수 형태.
    - next(action)을 호출하면 **그다음 처리해야 할 미들웨어에게 액션을 넘겨준다**. **그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.**

- lib/loggerMiddleware.js 에 미들웨어 작성

  ```
  const logeerMiddleware = (store) => (next) => (action) => {
    console.group(action && action.type);
    console.log('이전 상태', store.getState());
    console.log('액션', action);
    next(action);
    console.log('다음 상태', store.getState());
    console.group();
  };
  ```

  - next(action). 지정된 action을 통해 다음 미들웨어 혹은 리듀서에 전달한다.

- src/index.js에서 store에 추가

  ```
  const store = createStore(rootReducer, applyMiddleware(logeerMiddleware));

  ```

## 2. redux-logger 사용하기

- 이미 만들어져 있는 미들웨어
- yarn add redux-logger
- src/index.js에 createLogger 추가
  ```
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));
  ```
  - 개발자 도구로 확인하기

# 🎯 비동기 작업을 처리하는 미들웨어

## redux-thunk : 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해준다.

## redux-saga : 특정 액션이 디스패치되었을 때 정해진 로직에 따라 액션을 디스패치시키는 규칙을 작성하여 비동기 작업을 처리

## 1-1. redux-thunk

- yarn add redux-thunk
- src/index.js

  ```
  import ReduxThunk from 'redux-thunk'
  const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
  ```

- modules/counter.js 에 추가

  ```
  export const increaseAsync = () => (dispatch) => {
    setTimeout(() => {
      dispatch(increase());
    }, 1000);
  };

  export const decreaseAsync = () => (dispatch) => {
    setTimeout(() => {
      dispatch(decrease());
    }, 1000);
  };
  ```

  - redux-thunk에서는 액션 생성 함수에서 일반 객체를 반환하는 대신에 함수를 반환한다.

- container/CounterContainter.js에서 액션 생성함수들 Async로 교체

## 1-2. 웹 요청 비동기 작업 처리하기

# 🎯
