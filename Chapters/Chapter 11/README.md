# Chapter 11 : 컴포넌트 성능

# 🎯 많은 데이터 렌더링 해서 lag 만들기

## 1. 컴포넌트 외부에 2500개 데이터 생성 함수 만들고 useRef(2501)로 바꾸기

    ```
    function createBulkTodos() {
    const array = [];
    for (let i = 0; i <= 2500; i++) {
        array.push({
        id: i,
        text: `할 일 ${i}`,
        checked: false,
        });
    }
    return array;
    }
    ```

- 성능체크하기
  - 크롬 개발자 도구 이용
  - performance 탭 -> 녹화기능 틀고 기능들 시험

## 2. 느려지는 원인 분석

- 리렌더링 되는 상황

  - 자신이 전달받은 props가 변경될 때
  - 자신의 state가 바뀔 때
  - 부모 컴포넌트가 리렌더링 될 때
  - forceUpdate() 함수가 실행될 때

- TodoApp의 경우
  1. 할 일 1을 체크할 경우 App의 state가 변경되면서 App.js 리렌더링
  2. 부모 컴포넌트가 리렌더링 -> 나머지 자식 컴포넌트들도 모두 리렌더링
  3. 할 일 1 외에 나머지 2499개는 리렌더링 안되도 되지만 리렌더링 되면서 성능이 저하

## 리렌더링 성능 최적화 ( 리렌더링이 불필요할 때 리렌더링을 방지한다. )

# 🎯 React.memo()를 사용하여 컴포넌트 성능 최적화

- **클래스형 컴포넌트는 shouldComponentUpdate 라이프사이클 메서드** 사용

## 1. React.memo() 함수

- **컴포넌트의 props가 바귀지 않는다면 리렌더링하지 않도록** 설정
- 사용법 : 컴포넌트를 만들고 감싸 주기
- TodoListItem 컴포넌트에 적용
  ```
    const TodoListItem = ({ todo, onRemove, onToggle }) => {
        ...
    }
    export default React.memo(TodoListItem);
  ```
  - todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 안한다.
  - 건들지 않은 TodoListItem은 리렌더링 안된다.

# 🎯 onToggle, onRemove 함수가 바뀌지 않게 하기

- todos배열이 업데이트 되면 onRemove와 onToggle 함수는 map 과정에서 todos를 관심사로 가지고 있기 때문에 todos배열이 변할 때 마다 함수가 생성된다.

## 1. useState()의 함수형 업데이트

- **setTodos를 사용할 때 새로운 상태로 파라미터를 넣는 대신 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수 넣기**
- 일반 setTodos

  ```
  const onInsert = useCallback(
      (text) => {
      const nextTodo = {
          id: nextId.current,
          text,
          checked: false,
      };

      setTodos([...todos, nextTodo]);
      nextId.current += 1;
      },
      [todos],
  );
  ```

- **함수형 업데이트** 사용한 setTodos

  ```
    setTodos((todos) => {
      return [...todos, nextTodo];
    });

    nextId.current += 1;
  }, []);
  ```

  - **두 번째 인자에 관심사를 빼도 된다.**
  - useCallback 으로 재사용하도록 만들었지만, 결국 todos를 지켜보아야하는 건 같기 때문에 todos가 변할 때마다 함수가 새로 생성된다.
  - 이걸 지우고 setTodos에서 화살표 함수로 **업데이트를 어떻게 할 건지에 대한 업데이트 함수를 만들면 함수를 새로 생성하지 않고 재사용 가능하다.**

- insert, remove, toggle에 모두 적용

## 2. useReducer() 사용

- useReducer로 type을 설정해 재호출 막을 수 있다.
- reducer 함수
  ```
  function todoReducer(todos, action) {
      switch (action.type) {
          case 'INSERT':
          return [...todos, action.nextTodo];
          case 'REMOVE':
          return todos.filter((todo) => todo.id !== action.id);
          case 'TOGGLE':
          return todos.map((todo) =>
              todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
          );
          default:
          return todos;
      }
  }
  ```
- dispatch 설정

  ```
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    ...

  const onToggle = useCallback((id) => {
      dispatch({ type: 'TOGGLE', id });
  }, []);
  ```

  - dispatch 함수 안 (action)에 모든 정보 넣기

  ```
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  ```

  - createBulkTodos 함수를 처음 렌더링할 때 한번만 호출함. useMemo() Hook과 비슷..?

# 🎯 불변성의 중요성

- **불변성을 지킨다 : 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것**
- 불변성이 지켜지지 않는다면 객체 내부의 값이 수정되어도 변화를 알아차리지 못함
- React.memo()에서 서로 비교하여 최적화하는 것이 불가능

## 1. 전개연산자(...연산자)

- **얕은 복사**

  - 내부의 값을 모두 복사하는 것이 아닌 가장 바깥족에 있는 값만 복사
  - 따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 주어야 한다.

  ```
  const todo= [{ .. }, { .. }]
  const deepTodo = [...todo]
  ```

  - 얕은 복사

  ```
  deepTodo[0]={
      ...deepTodo[0],
      {...}
  }
  ```

  - **깊은 복사**. 즉, 내부의 값을 한번 더 복사해줘야 함
  - 내용이 깊을 수록, 코드가 복잡해 진다 -> Chapter 11. Immer 라이브러리 에서

# 🎯 TodoList 컴포넌트 최적화 하기

- 리스트에 관련 컴포넌트는 리스트 내부의 컴포넌트 뿐만 아니라 **리스트로 사용하는 컴포넌트 자체도 최적화**를 해줘야 한다.

  ```
      export default React.memo(TodoList)
  ```

  - 당장 성능에 영향을 주진 않지만, App.js에서 새로운 state가 추가된다거나 한다면 불필요한 리렌더링이 된다. -> 미리 최적화 해두기

- 리스트 관련 컴포넌트 : **리스트와 리스트 아이템 최적화 !!**

# 🎯 react-virtualized를 사용한 렌더링 최적화

- 화면에 보이는 만큼만 렌더링하기.
- 처음 2500개 모두를 렌더링 하는게 아닌 최대로 **보여줄 수 있는 만큼의 개수만 렌더링**.
- 처음 웹 페이지 생성에 속도 굉장히 빨라짐

## 1. react-virtualized

- 스크롤되기 전에 보이지 않는 컴포넌트들 렌더링하지 않고 **크기만 차지**하게끔 한다.
- **스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트 자연스럽게 렌더링**
- 설치 : yarn add react-virtualized

## 2. 최적화 준비

- 각 항목의 실제 px 크기 알아내기
- 크롬 개발 도구로 알아내기

## 3. TodoList 컴포넌트 수정

- import {List} from 'react-virtualized';
- List 컴포넌트: 해당 리스트의 **전체 크기(width, height, 전체 개수)**, **각 항목의 높이**, **각 항목을 렌더링할 때 사용하는 함수**, **배열을**, 을 props로 넣어야한다.

  - 기존 컴포넌트 지우고 List 컴포넌트 안에 정보 입력

  ```
  return (
      <List
      className="TodoList"
      width={495}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
      />
  );
  ```

  - rowCount : 전체 개수, rowHight : 각 항목의 높이, rowRenderer : 항목을 렌더링할 때 사용하는 함수. list : 배열

- rowRenderer 함수
  ```
  const rowRenderer = useCallback(
      ({ index, key, style }) => {
      const todo = todos[index];
        return (
            <TodoListItem
            todo={todo}
            key={key}
            onRemove={onRemove}
            onToggle={onToggle}
            style={style}
            />
        );
      },
      [onRemove, onToggle, todos],
  );
  ```
  - List 컴포넌트에서 각 TodoItem을 렌더링할때 사용.
  - 이 함수를 List 컴포넌트의 props로 설정해 주어야 한다.
  - 파라미터에 index, key, style 값 객체타입으로 받아와 사용
  - key는 list 배열로 넘겨진 todos.key

## 4. TodoListItem 수정 ( CSS 작업 )

- div로 감싸고 props로 전달받은 style 적용

  ```
  const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;

  return (
      <div className="TodoListItem-virtualized" style={style}>
          ...
      </div>
  ```

- TodoListItem.scss 작업
  ```
  .TodoListItem-virtualized {
  & + & {
      border-top: 1px solid #dee2e6;
  }
  &:nth-child(even) {
      background: #f8f9fa;
  }
  }
  ```
