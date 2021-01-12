# Chapter 02 : JSX

# 🎯 JSX란?

- 자바스크립트의 확장 문법.
- 브라우저에서 실행되기 전에 번들링 되는 과정에서 바벨을 사용해 일반 자바스크립트 형태의 코드로 변환된다.

---

# 🎯 JSX의 장점

## 1. 보기 쉽고 익숙하다

- JSX
  ```
      return{
          <div>
              Hello <b>react</b>
          </div>
      }
  ```
- 일반 자바스크립트
  ```
      return React.createElement("div",null,"Hello ", React.createElement("b",null,"react"));
  ```

## 2. 높은 활용도

- HTML 태그 뿐 아니라 **컴포넌트도 JSX 안에 작성 가능**
  ```
      return{
          <div>                      // HTML 태그
              <SampleComponent />    // 컴포넌트
          <div>
      }
  ```

---

# 🎯 JSX 문법

## 1. 감싸인 요소

- 컴포넌트에 여러 요소가 있다면 부모 요소 하나로 감싸야 한다. ( 트리 구조로 만들기 )
  - **트리 구조로 만들어야 Virtual DOM에서 컴포넌트 변화를 감지할 때 효율적이다.**
  ```
      return{
          <div>   // 부모 요소 하나로 감싸기
              <h1>첫번째 요소</h1>
              <h2>두번째 요소</h2>
          <div>
      }
  ```

## 2. 자바스크립트 표현

- **{ }**을 이용해서 JSX안에서 자바스크립트 표현식 사용.
  ```
      cosnt name = '리액트';
      return <h1>{name} 안녕!</h1>     // 리액트 안녕!
  ```

## 3. if문 대신 조건부 연산자

- if문을 사용할 수 없기 때문에 **삼항연산자** 사용
  ```
     cosnt name = '리액트';
     return (
         <div>
             {name==='리액트'} ? (<h1> TRUE </h1>) : (<h1> FALSE </h1>)
         </div>
     )
  ```

## 4. **&& 연산자를 사용한 조건부 렌더링**

- 특정 조건을 만족할 때만 내용을 보여주고 싶을 때.
  ```
      cosnt name = '리액트';
      return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>        // True 일 때만
  ```

## 5. undefined 렌더링하지 않기

- undefined는 렌더링 되지 않고 오류 발생
- 방지 하기 위해 **OR(||)** 사용한다.
  ```
      const name = undefined;
      return name || '값이 undefined 입니다.'
  ```

## 6. 인라인 스타일링

- 함수 안에 객체를 이용해 스타일 속성들을 미리 정의할 수 있다.
- 이 객체를 태그 요소 style 안에 적용 가능하다.
- 스타일 속성중 하이푼(-)으로 표현되는 속성은 -을 없애고 **카멜 표기법**으로 작성해아 한다.

  ```
      // 스타일 미리 적용
      const style = {
          backgroundColor: 'black'    // camel 표기법
      }

      return <div style={style}>스타일 적용</div>
  ```

## 7. class 대신 className

- CSS, JS 에서 클래스를 사용할 때 일반적인 class 대신 **className**을 사용한다.
  ```
      return <div className="react">{name}</div>
  ```

## 8. 꼭 닫아야 하는 태그

- 일반적인 HTML에서 안 닫아도 되는 태그들은 JSX에서는 꼭 닫아야 한다.
  ```
      <input>내용</input>
      <input />   // 태그사이에 내용이 없는 경우
  ```

## 9. 주석

```
     {/* ... */} 사용
```

---

# 🎯 ESLint, Prettier 적용하기

- VSCode market place에서 설치, 적용

## 1. ESLint

- 문법 검사 도구

## 2. Prettier

- 코드 스타일 자동 정리 도구
- setting
  - 프로젝트 최상위 디렉토리에 **.prettierrc** 파일 생성
    ```
        {
            "singleQuoto" : true, // 싱글 쿼테이션 사용 여부
            "semi" : true,        // 세미콜론 자동 생성 설정
            "useTabs" : false,    // 탭 사용 여부
            "tabwidth" : 2,       // 탭 너비 설정
        }
    ```
- 저장할 때 자동으로 코드 정리하기
  - Code -> 기본 설정 -> 설정 클릭

---

# 🎯 코드 분석

## 1. 모듈 불러오기

- **웹팩(번들러)** 으로 묶인 파일들을 불러오기
  ```
  import React from 'react';
  import './App.css';
  import logo from './logo.svg';
  ```
- 웹팩의 로더 기능 - CRA가 알아서 설정
  1.  file-loader : SVG, CSS 파일 불러오기
  2.  babel-loader : js 파일 불러오면서 ES5로 변환

## 2. 컴포넌트 만들기

- function 이용해 컴포넌트 만들기

  ```
  function App() {
  return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
          Learn React
          </a>
      </header>
      </div>
      );
  }

  export default App;

  ```
