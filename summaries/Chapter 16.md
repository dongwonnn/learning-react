# Chapter 16 : 리덕스 라이브러리 이해하기

- 리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리
  1. 관련 로직을 다른 파일로 분리시켜 효율적으로 관리.
  2. 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달, 업데이트 가능
  3. 전역 상태를 관리할 때 굉장히 효과적
  4. 코드의 유지보수, 작업 효율 극대화
  5. 미들웨어를 통한 비동기 작업 효율적 관리

# 🎯 순서

## 1. 액션 이름 정의

- 사용하고자 하는 액션의 이름을 변수로 저장

## 2. 액션 객체 생성 함수 생성

- 타입필드와 속성들을 가진 객체 생성

## 3. 초기값 생성

- 초기 상태 정의

## 4. 리듀서 생성 reducer(state, action)

- 변화를 일으키는 함수 생성
- dispatch(객체 생성 함수(인자))가 호출 되면 리듀서의 action을 통해 type과 전달받은 값 접근

## 5. 스토어 생성

## 6. 렌더 함수 생성

- dispach가 발생하여 리듀서 함수가 호출되어서 상태가 변한다면 호출되는 함수

## 7. 구독하기

- dispach가 되는지 감시하는 함수

## 8. 액션 발생

- onclikc과 같은 변화가 일어날 때 dispatch를 통해 액션 발생

# 🎯 개념 정리

## 1. 액션 (객체)

- 상태에 **어떤 변화가 필요하면 액션**이 발생한다.
- 하나의 객체로 표현
  ```
  {
    type: 'TOGGLE_VALUE'
  }
  ```
- 액션 객체는 type 필드를 반드시 가지고 있다. 이것을 액션의 이름.
- 그 외의 값들은 나중에 상태 업데이트 할 때 참고해야 할 값들.
  ```
  {
    type: 'ADD_TODO',
    data: {
      id: 1,
      text:'리덕스 배우기'
    }
  }
  ```

## 2. 액션 생성 함수

- **액션 객체를 만들어주는 함수**
- 어떤 변화를 일으킬 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 위해 **함수**로 관리

  ```
  function addTodo(data) {
    return {
      type: 'ADD_TODO',
      data
    }
  }

  // 화살표 함수
  addTodo = data => ({
    type: 'ADD_TODO'
    data
  })
  ```

## 3. 리듀서

- **변화를 일으키는 함수.**
- **액션을 만들면서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 온 후 두 값을 참고하여 새로운 상태를 만들어 반환.**

```
const initialState = {
  counter: 1
}

function reducer(state = initialState, action) {
  switch(action.type){
    case INCREASE:
      return {
        counter: state.counter + 1
      }
    default :
      return state
  }
}
```

## 4. 스토어

- 프로젝트에 리덕스를 적용하기 위해 스토어 생성. **한 개의 프로젝트에 단 하나의 스토어만 가질 수 있음.**
- 스토어 안엔 **현재 애플리케이션 상태와 리듀서**가 들어가 있으며 그 외 **내장 함수**들 지님.

## 5. 디스패치

- 액션을 발생시키는 것. dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출.
- 이 함수가 호출되면 스토어는 **리듀서 함수를 실행시켜 새로운 상태를 만들어 준다.**
- 스토어의 내장 함수 중 하나.

## 6. 구독

- subscribe 함수 안에 리스너 함수를 파라미터로 넣어 호출해 주면 **리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출 된다.**
- 스토어의 내장 함수 중 하나.

  ```
  const listener = () => {
    consol.log('상태 업데이트')
  }

  const unsubscribe = store.subscribe(listener);
  unsubscribe();
  ```

# 🎯 리액트 없이 쓰는 리덕스

- 바닐라 자바스크립트를 이용하여 리덕스의 핵심 기능과 작동 원리 이해

## 1. 프로젝트, UI 구성하기

## 2. DOM 레퍼런스 만들기

## 3. 액션 타입과 액션 생성 함수 정의

- 액션에 이름 정의. 문자열 형태로 대문자로 작성, 고유해야 한다.

  ```
  const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
  const INCREASE = 'INCREASE'
  const DECREASE = 'DECREASE'
  ```

- 액션 생성 함수 작성. 반드시 type 값 지니고 있어야 한다.

```
const toggleSwitch = () => ({ type: TOGGLE_SWITCH})
const increase = (difference) => ({type: INCREASE})
const decrease = () => ({type : DECREASE})
```

## 4. 초깃값 설정

```
const initialState = {
  toggle : false,
  counter : 0
}
```

## 5. 리듀서 함수 정의

- initialState로 초기값을 지정.
- spread(...) 연산자로 불변성 유지.

```
function reducer(state = intialState, action) {
  switch(action.type){
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle : !state.toggle
      }
    case INCREASE:
      return {
        ...state,
        counter : state.counter + action.difference
      }
    case DECREASE:
      reutnr {
        ...state,
        counter: state.counter -1
      }
    default :
      return state
  }

}
```

## 6. 스토어 만들기

- createStroe 함수 사용. 파라미터엔 리듀서 함수 넣어 주어야 한다.

  ```
  import {createStore} from 'redux';
  ...
  const store = createStore(reducer);
  ```

## 7. render 함수 만들기

- 상태가 업데이트 될 때, 즉 dispatch에 의해 action 함수 생성될 때마다 호출.

  ```
  const render = () => {
    const state = store.getState(); // 현재 상태 불러오기.
    if(state.toggle){
      divToggle.classList.add('active')
    } else{
      divToggle.classList.remove('active')
    }
    counter.innerText = state.counter;
  }

  render();
  ```

## 8. 구독하기

- 스토어의 상태가 바뀔 때마다 render함수 호출되도록 해준다.
- subscribe 사용. 함수 파라미터로 함수 형태의 값을 전달.
- 전달된 함수는 추후 액션이 발생하여 상태가 업데이트될 때마다 호출. => dispatch 호출 시에

```
store.subscribe(render);
```

- react-redux 라이브러리가 대신 해준다.

## 9. 액션 발생시키기 ( =디스패치 )

- 스토어의 내장함수 dispatch 사용. 파라미터는 액션 객체를 넣어 준다.

  ```
  divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
  };
  btnIncrease.onclick = () =>{
    store.dispatch(increase());
  }
  btnDecrease.onclick = () => {
    stroe.dispatch(decrease());
  }
  ```

# 🎯 리덕스의 3가지 규칙

## 1. 단일 스토어

- 하나의 애플리케이션 안에는 하나의 스토어

## 2. 읽기 전용 상태

- 상태를 업데이트 할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해야 한다.
- 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교 검사를 하기 때문에. -> 겉핥기 식으로 비교하여 좋은 성능 유지

## 3. 리듀서는 순수한 함수

- 순수한 함수

  1. 이전 상태와 액션 객체를 파라미터로 받는다.
  2. 파라미터 외의 값에는 의존하지 않는다.
  3. 이전 상태는 건드리지 않고 변화를 준 새로운 상태 객체를 만들어 반환한다. (불변성 유지)
  4. 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값 반환해야 한다. (불변성 유지)

- 이것 외에 랜덤 값, Date 함수, 네트워크 요청 등은 파라미터가 같아도 다른 결과를 만들어 낼 수있다.
  - 리듀서 함수 바깥에서 처리. 혹은 **리덕스 미들웨어**에서 처리한다.
