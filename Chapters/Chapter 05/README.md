## _ 책에는 클래스형 컴포넌트 위주로 설명되어서 함수형 컴포넌트로 다시 정리_

# Chapter 05 : ref: DOM에 이름 달기

- 일반적인 HTML에서 DOM에 이름을 달 때 id 사용
- React에선 ref 사용

# 🎯 어떤 상황에서 사용?

## 1. 일반적인 HTML와 React 비교

- password 검증 하기

  - HTML은 직접 DOM에 접근해 비밀번호 검증
  - HTML 파일

  ```
  <body>
      <input type="password" id="password">
      <button onClick="validate()">Validate</button>
  </body>
  <script>
      function validate() {
          var input = document.getElementById('password')
          input.className = '';
          if (input.value === '0000') {
              input.className = "success"
          } else {
              input.className = "failure"
          }
          console.log(input.value)
      }
  </script>
  ```

  - React ( 함수형 컴포넌트로 사용 )
  - React는 직접 DOM에 접근하지 않고 비밀번호 검증

  ```
  <자식 컴포넌트>
  import React, { useState } from 'react';
  import './ValidationSample.css';  // 파일 추가해서 적용

  const ValidationSample = () => {
  const [validation, setValidation] = useState({
      password: '',
      clicked: false,
      validated: false,
  });

  const { password, clicked, validated } = validation;

  const onChange = (e) => {
      const nextValidation = {
      ...validation,
      password: e.target.value,
      };
      setValidation(nextValidation);
  };

  const handleButtonClick = () => {
      const nextValidation = {
      ...validation,
      clicked: true,
      validated: password === '0000',
      };
      setValidation(nextValidation);
  };

  return (
      <div>
      <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          className={clicked ? (validated ? 'sucess' : 'failure') : ''}
      />
      <button onClick={handleButtonClick}>검증하기</button>
      </div>
    );
  };

  export default ValidationSample;

  <부모 컴포넌트에 렌더링>
    ...
  ```

## 2. DOM을 꼭 사용해야하는 상황 --> 이때 ref 사용

- **DOM을 직접적으로 건드려야 할 때**
  1. 특정 input에 포커스 주기
  2. 스크롤 박스 조작하기
  3. Canvas 요소에 그림 그리기

# 🎯 ref 사용법

### 클래스형 컴포넌트 에서 설정하는 법

### <함수형 컴포넌트>

## 1. useRef(Hooks) 사용

- 기본 세팅: const 이름 = useRef(null)
- 선택하고 싶은 DOM에 ref 값으로 설정.
- ex)

  - DOM에 ref 설정

  ```
  const inputEL = useRef(null);
  ...
  <input onChange= {onChange} ref={inputEL}>
  ```

  - DOM에 적용된 함수 내에서 사용
  - current를 이용하여 접근

  ```
    const onChange = (e) => {
        ...
        inputEL.current.focus();
    }
  ```

- useRef의 또 다른 사용
  - 로컬 변수 사용. -> Chpater 8. Hooks

### <클래스형 컴포넌트>

## 2. 콜백함수을 통한 ref 설정

- 가장 기본적인 방법 - **콜백함수**
- ref를 달고자 하는 요소에 ref라는 콜백함수를 props로 전달
- 이 콜백함수는 ref값을 파라미터로 전달받음.

```
<input ref = {(ref) => {this.input=ref}}>
```

## 3. createRef를 통한 ref 설정

- 리액트에 내장되어 있는 createRef 함수 사용

```
input = React.createRef();
```

- 해당 DOM 안의 함수에서 접근

```
this.input.current.focus();
```

# 🎯 컴포넌트에 ref 달기

- 컴포넌트에 ref를 달아서 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때.

### 함수형 컴포넌트에서 사용법 알고 업데이트

## 1. 사용법

## 2. 컴포넌트 초기 설정

## 3. 컴포넌트에 메서드 설정

## 4. 컴포넌트에 ref 달고 내부 메서드 사용
