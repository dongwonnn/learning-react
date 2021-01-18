# Chapter 17 : 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기 (1)

- 소규모 프로젝트는 컴포넌트가 가진 state를 사용하는 것만으로도 충분하지만 규모가 커지면 상태 관리가 번거롭다.
- 리덕스 사용의 이점
  1. 상태 업데이트에 관한 로직을 모듈로 따로 분리.
  2. 컴포넌트 파일과 별개로 관리할 수 있어 유지보수 도움.
  3. 여러 컴포넌트에서 동일한 상태를 공유해야 할 때 매우 유용.
  4. 실제 업데이트가 필요한 컴포넌트만 리렌더링 되도록 쉽게 최적화 가능
- store 보단 react-redux 라이브러리에서 제공하는 유틸 함수 connect와 컴포넌트 Provider 사용하여 리덕스 관련 작업 처리.

- 세팅
  - redux, react-redux 설치
    - yarn add redux react-redux
  - Counter, Todo UI 세팅

# 🎯 리덕스 관련 코드 작성하기

- 액션 타입, 액션 생성 함수, 리듀서 코드 3가지 작성해야 한다.
  - 각각 actions, constants, reducers 폴더에 묶어서 작성하는 방법 -> 하나 바꿀때 3가지 모두 바꿔야한다.
  - 기능별로 modules 파일 하나에 몰아서 다 작성하는 방법 - Ducks 패턴

## 모듈 작성 순서

1. 액션 타입 정의
2. 액션 생성 함수 정의
3. 초기 상태 및 리듀서 함수 만들기

## 1. 카운터 모듈 작성하기

    ```
    // 액션 타입 설정
    const INCREASE = 'counter/INCREASE';
    const DECREASE = 'counter/DECREASE';

    // 액션 생성 함수 설정
    export const increase = () => ({ type: INCREASE });
    export const decrease = () => ({ type: DECREASE });

    // 초기값 설정
    const initialState = {
    number: 0,
    };

    // 리듀서 함수 설정
    function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
        return {
            number: state.number + 1,
        };
        case DECREASE:
        return {
            number: state.number - 1,
        };
        default:
        return state;
    }
    }

    export default counter;

    ```
    - export와 export default 의 차이 : 전체와 부분 export의 차이

## 2. todos 모듈 작성하기

    ```
    const CHANGE_INPUT = 'todos/CHANGE_INPUT';
    const INSERT = 'todos/INSERT';
    const TOGGLE = 'todos/TOGGLE';
    const REMOVE = 'todos/REMOVE';

    export const change_input = (input) => ({
        type: CHANGE_INPUT,
        input,
    });

    let id = 3;
    export const insert = (text) => ({
        type: INSERT,
        todo: {
            id: id++,
            text,
            done: false,
        },
    });

    export const toggle = (id) => ({
        type: TOGGLE,
        id,
    });

    export const remove = (id) => ({
        type: REMOVE,
        id,
    });

    const initialState = {
        input: '',
        todos: [
            {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true,
            },
            {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false,
            },
        ],
    };

    function todos(state = initialState, action) {
        switch (action.type) {
            case CHANGE_INPUT:
            return {
                ...state,
                input: action.input,
            };
            case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo),
            };
            case TOGGLE:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo,
                ),
            };
            case REMOVE:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id),
            };
            default:
            return state;
        }
    }

    export default todos;
    ```

## 3. 루트 리듀서 만들기

- createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 한다.
- 리덕스에서 제공하는 combineReducers 유틸 함수를 이용하여 하나로 합친다.
- modules/index.js에 작성

  ```
  import { combineReducers } from 'redux';
  import counter from './counter';
  import todos from './todos';

  const rootReducer = combineReducers({
  counter,
  todos,
  });

  export default rootReducer;
  ```

# 🎯 리액트 애플리케이션 리덕스 적용하기

- 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업은 src/index.js에서 이루어짐

## 1. 스토어 만들기

- redux의 createStore 함수를 이용하여 스토어 생성
- src/index.js 에 추가

  ```
  import {createStore} from 'redux';
  import rootReducer from './modules'

  const store = createStore(rootReducer)
  ```

## 2. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기

- 리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 Provider로 감싸준다.
- src/index.js 에 추가

  ```
  import {Provider} from 'react-redux'
  <Provider store ={store}>
      <App />
  </Provider>
  ```

  - connect를 쓸 때 연결 가능

## 3. Redux DevTools 설치, 이용

- 리덕스 개발자 도구. 크롬 확장 프로그램으로 설치하여 사용 가능하다.
- 패키지를 설치하여 적용
  - yarn add redux-devtools-extension

# 🎯 컨테이너 컴포먼트 만들기

- 컨테이너 컴포먼트 : 리덕스 스토어와 연동된 컴포넌트
  - 리덕스 스토어에 접근하여 원하는 상태를 받아 오고, 액션도 디스패치 해주는 과정

## 1. CounterContainer 만들기

- src/containers/CounterContainer.js 생성 ( CounterContainer 컴포넌트 생성)
- 위 컴포넌트를 리덕스와 연동하기 위해 connect 함수 사용 (react-redux 제공)

  > connect(mapStateProps, mapDispatchToProps)(연동할 컴포넌트)

  - mapStateProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위한 설정
  - mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
  - connect 함수를 호출하면 함수를 반환. 이 함수에 컴포넌트를 파라미터로 넣어주면 리덕스와 연동된 컴포넌트 생성
    > const makeComponent = connect(mapStateToProps, mapDispatchToProps)
    > makeComponent(연동할 컴포넌트)

- CounterContainer.js

  ```
  const CounterContainer = ({ number, increase, decrease }) => {
  return (
      <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
  };

  const mapStateToProps = (state) => ({
  number: state.counter.number + 1,
  });

  const mapDispatchToProps = (dispatch) => ({
    increase: () => {
        console.log('increase');
    },
    decrease: () => {
        console.log('decrease');
    },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
  ```

  - mapStateToProps 는 스토어의 상태를, mapDispatchToProps 는 스토어의 dispatch를 받아온다.
    - createStore를 통해 rootReducer에 있는 counter, todo 가지고 있는 상태
    - App을 Provider로 묶어 사용 가능

- connect 함수 map 숨기기

  - connect 함수 내부에 익명 함수 형태로 선언해도 된다.

  ```
  export default connect(
  (state) => ({
      number: state.counter.number,
  }),
  (dispatch) => ({
      increase: () => dispatch(increase()),
      decrease: () => dispatch(decrease()),
  }),
  )(CounterContainer);
  ```

- redux의 bindActionCreates 유틸 함수를 이용하여 dispatch로 감싸는 불편함 없애기.

  ```
  import { bindActionCreators } from 'redux'

  export default connect(
  (state) => ({
      number: state.counter.number,
  }),
  (dispatch) =>
      bindActionCreators(
      {
          increase,
          decrease,
      },
      dispatch,
      ),
  )(CounterContainer);
  ```

  - 더 간단하게

  ```
  export default connect(
      state=> ({
          number: state.counter.number,
      }),
      {
          increase,
          decrease
      }
  )(CounterContainer);
  ```

## 2. TodosContainer 만들기

- CounterContainer와 마찬가지로 설정
- TodosContainer.js

  ```
  import React from 'react';
  import { connect } from 'react-redux';
  import Todos from '../components/Todos';
  import { changeInput, insert, toggle, remove } from '../modules/todos';

  const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
  }) => {
  return (
      <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
      />
  );
  };

  export default connect(
  ({ todos }) => ({
      input: todos.input,
      todos: todos.todos,
  }),
  {
      changeInput,
      insert,
      toggle,
      remove,
  },
  )(TodosContainer);
  ```

- Todos.js

  ```
  import React from 'react';

  const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
      <div>
      <input
          type="checkbox"
          // onToggle
          onClick={() => onToggle(todo.id)}
          checked={todo.done}
          readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
      </span>
      {/* onRemove로 삭제 */}
      <button onClick={() => onRemove(todo.id)}>삭제</button>
      </div>
  );
  };

  const Todos = ({
  input,
  todos,
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
  }) => {
  const onSubmit = (e) => {
      e.preventDefault();
      // onInsert로 값 입력
      onInsert(input);
      onChangeInput('');
  };

  // onChangeInput으로 상태 업데이트
  const onChange = (e) => onChangeInput(e.target.value);
  return (
      <div>
      <form onSubmit={onSubmit}>
          <input value={input} onChange={onChange} />
          <button type="submit">등록</button>
      </form>
      <div>
          {todos.map((todo) => (
          <TodoItem
              todo={todo}
              key={todo.id}
              onToggle={onToggle}
              onRemove={onRemove}
          />
          ))}
      </div>
      </div>
  );
  };

  export default Todos;
  ```

# 🎯
