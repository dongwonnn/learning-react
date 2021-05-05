# Chapter 17 : 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기 (3)

# 최종 구조

```
App
├─ Counter Container
│     └─  Counter Component
└─ Todos Container
      └─  Todos Component
```

# 🎯 리액트 애플리케이션에 리덕스 적용하기 요약

1. 루트 리듀서 만들기

- counter와 todo 모듈을 설정하면 counter 리듀서와 todo 리듀서 두 개가 생성된다.
- 리덕스에서 제공하는 combineReducers 유틸함수를 통해 modules/index.js에서 rootReducer 생성한다
  ```
  const rootReducer = combineReducers({
    counter,
    todos
  })
  ```

2. 스토어 생성하기

- redux의 createStore 함수로 src/index.js에 생성 ( 전역으로 사용하기 때문에 )

3. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용

- react-redux의 Provider로 <App /> 컴포넌트 감싼다.
- 인자로 store 넘겨준다.

  ```
  <Provider store={store}>
    <App />
  </Provider>
  ```

4. Redux DevTools 설치, 사용

- 설치 : yarn add redux-devtools-extension
- 사용 : 스토어 생성할 때 createStore뒤에 composeWithDevTools를 인자로 설정

  ```
  import { composeWithDevTools } from 'redux-devtools-extension'
  const store = createStore(rootReducer, composeWithDevTools)
  ```

# 🎯 컨테이너 컴포넌트 요약

### 컨테이너 컴포넌트 : 리덕스 스토어와 연동된 컴포넌트. 관련 컴포넌트들을 하나의 컨테이너로 묶는다.

## 1. 생성 : containers/CounterContainer.js

```
const CounterContainer = () => {
  return <Counter />;
}
```

## 2. 연동 : connect ( react-redux 제공 )

- connect(mapStoreToProps, mapDispatchToProps)

  - mapStoreToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨준다.

    ```
    const mapStateToProps = (state) => ({
      number: state.counter.number + 1,
    });
    ```

    - state는 현재 store가 지니고 있는 상태

  - mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨준다.

  ```
  const mapDispatchToProps = (dispatch) => ({
    increase: () => {
      dispatch(increase());
    },
    decrease: () => {
      dispatch(decrease());
    },
  });
  ```

  - store의 내장 함수 dispatch를 파라미터로 받아와 함수를 생성한다.
    - (increase : () => {}, decrease : () => {}). 단지 함수 이름들이다.
  - 생성된 함수 내용에 사용할 dispatch(액션 객체 생성 함수(파라미터)) 설정.
    - 이때 액션 객체 생성 함수를 해당 모듈에서 import 해온다
    ```
    import { increase, decrease } from '../modules/counter'
    ```

- number와 increase, decrease를 가져와 하위 컴포넌트에 props값으로 넘겨 줄 수 있다.

  ```
  <Counter number={number} onIncrease={increase} onDecrease={decrease}>
  ```

- makeContainer(연동할 컴포넌트). ( 여기선 CounterContainer )

  ```
  export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
  ```

## 2-1. connect 간략화 하기(1)

- export default connect 함수 내부에 익명함수로 설정하기. (익명함수 : mapStateToProps, mapDispatchToProps 없이)
- bindActionCreators 유틸함수 사용하기

  ```
  export default connect(
    (state) => ({
      number: state.counter.number,
    }),
    dispatch=>
      bindActionCreators(
    {
      increase,
      decrease,
    },
     dispatch
    ),
  )(CounterContainer);
  ```

## 2-2. connect 간략화 하기(2)

- mapDispatchToProps 해당 부분을 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 바로 넣기
- connect 함수가 내부적으로 bindActionCreators 작업을 실행해준다.
  ```
  export default connect(
    (state) => ({
      number: state.counter.number,
    }),
    {
      increase,
      decrease,
    },
  )(CounterContainer);
  ```

## 2-3. connect 간략화 하기(2)

- 비구조화 할당을 통해 state 제거

```
    (state) => ({
      number: state.counter.number,
    }),

    // const {counter} = state
    // == state.counter
    // (state) = {counter}

    ({counter}) => ({
      number: counter.number,
    }),

```

# 🎯 리덕스 더 편하게 사용하기 요약

## 1. redux-actions (1)

- 설치 : yarn add redux-actions
- 액션 생성 함수를 간소화

  ```
  export const increase = () => ({type : INCREASE})
  ==
  export const increase = createAction(INCREASE)
  ```

- 리듀서의 switch/case가 아닌 handleActions 사용해 간소화

  ```
  const counter = handleActions(
    {
      [INCREASE] : (state, action) => ({ number : state.number + 1}),
      [DECREASE] : (state, action) => ({ number : state.number - 1}),
    },
    initialState
  )
  ```

## 2. redux-actions (2)

- **payload**

  - 만약 액션 생성 함수에서 타입 외에 추가 데이터를 넣고 싶을 때
  - createAction 함수의 두 번째 함수에 payload 정의하는 함수 따로 선언

  ```
    export const changeInput = createAction(CHANGE_INPUT, input=>input)
    export const insert = createAction(INSERT, text=> ({
      id: id++,
      text,
      done:false,
    }))
  ```

  - createAction의 두 번째 인자로 함수 반환
  - 이왕이면 의미 부여하기 위해 넣자

- **action.payload**
  - handleActions로 리듀서를 작성할 때는 파라미터로 받아 온 값을 action.payload로 공통적으로 가져온다.
    ```
    const todo = handleActions(
      {
        [CHANGE_INPUT] : (state, action) => ({ ...state, input: action.payload}),
        [INSERT] : (state, action) => ({
          ...state,
          todos: state.todos.concat(action.payload)
        })
      }
    )
    ```
  - 의미 부여를 하기 위해 비구조화 할당으로 이름을 새로 설정한다.
    - const {payload} = action => action.payload
    ```
    const todo = handleActions(
      {
        [CHANGE_INPUT] : (state, {payload: input}) => ({ ...state, input}),
        [INSERT] : (state, {payload: todo}) => ({
          ...state,
          todos: state.todos.concat(todo)
        })
      }
    )
    ```

# 🎯 Hooks 사용하여 컨테이너 컴포넌트 만들기 요약

## 1. useSelector로 상태 조회

- react-redux의 useSelector Hook
- connect를 안쓰고 상태 조회가 가능하다.

  ```
  import {useSelector} from 'react-redux'

  const number = useSelector(state => state.counter.number)
  return <Counter number={number} />
  ```

## 2. useDispatch로 액션 디스패치 하기

- react-redux의 useDispatch Hook

  ```
  import {useDispatch } from 'react-redux'

  const dispatch = useDispatch();
  return (
    <Counter
      onIncrease = {() => dispatch(incrase())}
      onDecrease = {() => dispatch(decrase())}
    >
  )
  ```

## 2-1. useCallback()으로 성능 최적화

- useDispatch와 useCallback은 항상 같이 쓰도록 습관화

  ```
  cosnt onIncrease = useCallback(() => dispatch(increase()), [dispatch])
  cosnt onDecrease = useCallback(() => dispatch(decrease()), [dispatch])

  return(
    <Counter onIncrease={onIncrease} onDecrease={onDecrease}>
  )
  ```
