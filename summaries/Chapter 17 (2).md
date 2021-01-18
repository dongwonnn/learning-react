# Chapter 17 : 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기 (2)

# 🎯 리덕스 더 편하게 사용하기

- 액션 생성 함수, 리듀서를 작성할 때 redux-actions 라이브러리와 immer 라이브러리 활용

## 1. redux-actions

- 액션 생성 함수를 더 짧게 작성할 수 있다.
- switch/case 문이 아닌 handleActions 함수 사용 가능

## 2. Counter 모듈에 작성하기

> import { createAction, handleActions } from 'redux-actions';

```
// createAction을 이용해 액션 생성 함수 설정
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// handleActions를 이용한 리듀서 함수 설정
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
```

- 첫 번째 인자로 업데이트 함수, 두 번째 함수로 초기 상태 설정

## 3. Todo 모듈에 작성하기

- modules/todos.js

  ```
  // createAction 사용해 액션 생성 함수 설정하기
  export const changeInput = createAction(CHANGE_INPUT, (input) => input);

  let id = 3;
  export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
  }));

  export const toggle = createAction(TOGGLE, (id) => id);
  export const remove = createAction(REMOVE, (id) => id);
  ```

  - 파라미터가 있는 경우 payload라는 이름을 사용
  - createAction의 두 번째 함수에 payload를 정의하는 함수를 따로 선언

  ```
  // handleActions 를 이용한 리듀서 작성
  const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, action) => ({
        ...state,
        input: action.payload,
        }),
        [INSERT]: (state, action) => ({
        ...state,
        todos: state.todos.concat(action.payload),
        }),
        [TOGGLE]: (state, action) => ({
        ...state,
        todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
        ),
        }),
        [REMOVE]: (state, action) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        }),
    },
    initialState,
  );
  ```

  - createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 action.payload라는 이름으로 공통으로 넣게 된다.
  - 따라서 기존의 업데이트 로직에서도 action.payload 값을 조회하여 업데이트

    ```
    const todos = handleActions(
        {
            [CHANGE_INPUT]: (state, { payload: input }) => ({
            ...state,
            input,
            }),
            [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo),
            }),
            [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
            }),
            [REMOVE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.filter((todo) => todo.id !== id),
            }),
        },
        initialState,
    );
    ```

    - action.payload로 눈에 잘 안들어온다면 비구조화 할당 문법을 통해 정확히 어떤 값을 의미하는지 파악 가능하다.

## 4. immer

- yarn add immer
- 불변성 유지를 위해 깊어지는 spread 연산자 방지
- Counter 처럼 간단한 경우 immer을 사용하면 더 복잡. Todos모듈에 적용.
- Todos.js
  ```
  // immer 사용한 reducer
  const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) =>
        produce(state, (draft) => {
            draft.input = input;
        }),
        [INSERT]: (state, { payload: todo }) =>
        produce(state, (draft) => {
            draft.todos.push(todo);
        }),
        [TOGGLE]: (state, { payload: id }) =>
        produce(state, (draft) => {
            const todo = draft.todos.find((todo) => todo.id === id);
            todo.done = !todo.done;
        }),
        [REMOVE]: (state, { payload: id }) =>
        produce(state, (draft) => {
            const index = draft.todos.findIndex((todo) => todo.id === id);
            draft.todos.splice(index, 1);
        }),
    },
    initialState,
  );
  ```

# 🎯 Hooks 사용하여 컨테이터 컴포넌트 만들기

- connect 함수 사용하는 대신 react-redux에서 제공하는 Hooks 사용

## 1. useSelector로 상태 조회하기

- connect 함수 대신 하는 Hook
  > const 결과 = useSelector(상태 선택 함수);
  ```
  const CounterContainer = () => {
    const number = useSelector((state) => state.counter.number);
    return <Counter number={number} />;
  };
  ```
  - mapStateToProps와 같은 역할. 상태만 조회 가능하다.

## 2. useDispatch를 사용하여 액션 디스패치하기

- 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해준다.

  > const dispatch = useDispatch();
  > dispatch({type: 'SAMPLE_ACTION'})

  ```
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increase())}
      onDecrease={() => dispatch(decrease())}
    />
  );
  ```

- 재사용 막기 위해 useCallback() 사용

  ```
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
      <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
  ```

## 3. TodosContainer도 Hooks를 이용하여 설정

    ```
    const TodoContainer = () => {
    const { input, todos } = useSelector(({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
    }));

    const dispatch = useDispatch();
    const onChangeInput = useCallback((input) => dispatch(changeInput(input)), [
        dispatch,
    ]);
    const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
    const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
    const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

    return (
            <Todos
                input={input}
                todos={todos}
                onChangeInput={onChangeInput}
                onInsert={onInsert}
                onToggle={onToggle}
                onRemove={onRemove}
            />
        );
    };

    export default TodoContainer;
    ```

## 4. useStore 사용하여 리덕스 스토어 사용하기

- 가급적 사용 금지
  > const store = useStore();
  > store dispatch({type:'SAMPLE_ACTION'})
  > store.getState();

## 5. useActions 유틸 Hooks 만들어서 사용하기

- 사용할 때 찾아보기

## 6. connect 함수와의 차이점

- connect : props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화
- useSelector : 리덕스 상태를 조회했을 때 최적화 작업이 자동으로 이루어지지 않는다.
  - React.memo를 컨테이너 컴포넌트에 사용해 준다.
  - TodosContainer.js
    > export default React.memo(TodosContainer);
