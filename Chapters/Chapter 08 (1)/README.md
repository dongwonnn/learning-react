## _7장과 연관지으면서. 개념 뒤로 갈수록 중요함_

# Chapter 08 : Hooks (1)

# 🎯 useState

- 첫 번째 인자로 현재 상태, 두 번째 인자로 상태를 바꾸는 함수
- 상태를 변화시킬 땐 항상 **불변성 유지**
- 앞에 다시 보기..

# 🎯 useEffect

- 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행
- 마운트 될 때 componentDidMount
- 업데이트 될 때 componentDidUpdate

## 1. 마운트될 때, 업데이트될 때두개를 합친 useEffect Hook

- 예제 코드

  ```
  import React, { useEffect, useState } from 'react';

  const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
      console.log({
      name,
      nickname,
      });
  });

  const onChangeName = (e) => {
      setName(e.target.value);
  };
  const onChangeNickName = (e) => {
      setNickname(e.target.value);
  };

  return (
      <div>
      <div>
          <input placeholder="이름" onChange={onChangeName} />
          <input placeholder="닉네임" onChange={onChangeNickName} />
      </div>
      <div>
          <b>이름 : {name}</b>
      </div>
      <div>
          <b>닉네임 : {nickname}</b>
      </div>
      </div>
  );
  };

  export default Info;

  ```

## 2. 마운트(componentDidMount)될 때만 쓰는 useEffect Hook

- useEffect 함수의 두 번째 파라미터로 비어 있는 배열 넣는다.
- console.log에 처음 렌더링할 때만 console이 찍히고 input 변경 시에는 안찍힘

  ```
  useEffect(() => {
      console.log({
      name,
      nickname,
      },[]);
  });
  ```

## 3. 특정값이 업데이트될 때만 실행하는 useEffect

- useEffect 함수의 두 번째 파라미터에 업데이트될 때 검사하고 싶은 값을 넣는다.
- name을 설정하면 name input이 바뀔때만 콘솔 찍힘. nickname input 바뀌어도 콘솔 안찍힘
- 관리하는 state외에 전달받은 props를 넣어도 된다.
  ```
  useEffect(() => {
      console.log({
      name,
      nickname,
      },[name]);
  });
  ```

## 4. 뒷정리함수

- 언마운트되기 전 (componentWillUnmount), 업데이트하기 직전(getSnapshotBeforeUpdate)에 작업 수행 하기위해 뒷정리 함수 반환

- 언마운트, 업데이트를 하기위해 부모 컴포넌트 가시성 추가

  ```
  const App = () => {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
      setVisible(!visible);
  };

  return (
      <div>
      <button onClick={onClick}>{visible ? '보이기' : '숨기기'}</button>
      <hr />
      {visible && <Info />}
      </div>
  );
  };
  ```

- 뒷정리함수 적용

  ```
  useEffect(() => {
      console.log('일반 상황1 -> 마운트되어서 Info 컴포넌트가 보일 때');
      console.log('일반 상황2 -> 정보가 업데이트 될 때');
      return () => {
      console.log('뒷정리 함수 상황1 : 언마운트 되어서 숨기려할 때');
      console.log(
          '뒷정리 함수 상황2 -> 업데이트 되기 직전에. 즉 input에 값 입력해도 업데이트 직전인 상황나옴. 리액트 -> 리액ㅌ'
      );
      console.log('상황 2는 2번째 배열에 값에 따라 달라짐');
      };
  }, [name]);
  ```

  - 일반 상황 1 : 마운트되어서 Info 컴포넌트가 보일 때
  - 일반 상황 2 : 정보가 업데이트될 때. (useEffect 두 번째 인자에 따라 다름)
  - 뒷정리 함수 1 : 언마운트 되어서 숨기려할 때
  - 뒷정리 함수 2 : 업데이트 되기 직전에. 즉 input에 값 입력해도 업데이트 직전인 상황나옴. 리액트 -> 리액ㅌ'. (useEffect 두 번째 인자에 따라 다름)

# 🎯 useReducer

- **다양한 컴포넌트 상황**에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때
- 지금까지는 onClick 이벤트 같은 누르는 상황에만 값을 업데이트 했음.
- reducer(state, action). (현재 상태, 업데이트를 위해 필요한 정보를 담은 액션)
- action 값을 받아 새로운 상태로 변환 -> **불변성 유지**
- 어떤 action인지 알려주는 **type 필드** 필요
- **컴포넌트 외부에 함수로 설정**
- useReducer의 가장 큰 장점 : **컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낸다.**

## 1. 카운터 구현

```
function reducer(state, action) {
  switch (action.type) {
      case 'INCREASE':
      return { value: state.value + 1 };
      case 'DECREASE':
      return { value: state.value - 1 };
      default:
      return state;
  }
}

  const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
      <div>
      <p>현재 카운터 값 : {state.value}</p>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREASE' })}>-1</button>
      </div>
  );
};
```

- 코드 분석

  ```
  function reducer(state, action) {
  switch (action.type) {
      case 'INCREASE':
      return { value: state.value + 1 };
      case 'DECREASE':
      return { value: state.value - 1 };
      default:
      return state;
  }
  }
  ```

  - **컴포넌트 외부에 함수로 설정**
  - useReducer의 가장 큰 장점 : **컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낸다.**
  - **해당 리듀서의 기본값을 return**

  ```
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  ```

  - state는 현재 가리키고 있는 상태.
  - dispatch는 액션을 발생시키는 함수
  - useReducer(reducer, {value: 0}) : reducer는 바깥의 reducer 함수. value는 해당 reducer의 기본값

  ```
  <button onClick={() => dispatch({ type: 'INCREASE' })}>+1</button>
  <button onClick={() => dispatch({ type: 'DECREASE' })}>-1</button>
  ```

- dispatch 함수 안에 파라미터로 **타입을 넣어주면 리듀서 함수가 호출**된다.

## 2. 인풋 상태 관리하기

- reducer 함수

  ```
  function reducer(state, action) {
  return {
      ...state,
      [action.name]: action.value,
  };
  }
  ```

  - spread 연산자 이용해 state 복사 ( 불변성 유지 )
  - action으로 e.target 타입 받아와 객체 안에 key를 []로 감싸 자체로 key를 만듬

- 컴포넌트

  ```
  const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
      name: '',
      nickname: '',
  });

  const { name, nickname } = state;

  const onChange = (e) => {
      dispatch(e.target);
  };

  return (
      <div>
          <input
            name="name"
            value={name}
            onChange={onChange}
          />
          <input
            name="nickname"
            value={nickname}
            onChange={onChange}
          />
      </div>
  };
  ```

  - name, value 값 설정 후, e.target 자체를 dispatch의 타입으로 전달
