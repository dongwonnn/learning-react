# Chapter 19 : 코드 스플리팅

- 리액트 프로젝트를 완성하여 사용자에게 제공할 때는 빌드 작업을 거쳐서 배포해야 한다.
- 빌드 작업

  - 불필요한 주석, 경고, 공백 등을 제거하여 파일 크기를 최소화 하고, JSX문법이나 다른 최신 자바스크립트
  - 문법이 원할하게 실행되도록 코드의 트랜스파일 작업도 가능
  - 이미지와 같은 정적 파일의 해당 파일을 위한 경로 설정
  - **웹팩**이 담당

- **웹팩**

  - 별도의 설정을 하지 않으면 프로젝트에서 사용 중인 **모든 JS 파일이 하나로 합쳐지고, 모든 CSS 파일도 하나의 파일로 합쳐진다.**
  - CRA에서는 SplitChunks라는 기능이 적용 되어 파일들을 따로 분리시켜 캐싱의 효과를 누릴 수 있다.

- **코드 스플리팅** : 파일을 분리하는 작업
  - A, B, C 3개의 페이지로 구성된 싱글 페이지 애플리케이션에서 별도로 지정하지 않는다면 A, B, C 컴포넌트의 모든 코드가 한 파일에 저장되어진다. (main)
    - 규모가 커지면 파일 크기가 커지고 로딩이 오래 걸려 트래픽도 많이 생성
  - 해결법이 **코드 비동기 로딩** (코드 스플리팅의 한 방법)
    - **코드 비동기 로딩**을 통해 자바스크립트 함수, 객체, 컴포넌트를 처음에 불러오지 않고 필요한 시점에 불러와서 사용

# 🎯 자바스크립트 함수 비동기 로딩

- 일반 자바스크립트 함수를 스플리팅 하기
- notify.js
  ```
  export default function notift(){
    alert('안녕하세요!');
  }
  ```
- 다른 파일에서 import 할 때, 함수 안에서 import를 하면 코드 스프리팅 됨.
  ```
  const onClick = () => {
    import('./notify').then((result) => result.default());
  };
  ```
  - 개발자 도구, Network에서 클릭 하면 확인 가능

# 🎯 React.lazy와 Suspense를 통한 컴포넌트 코드 스플리팅

- 코드 스플리팅을 위한 리액트에 내장된 기능인 함수
- 16.6 버전 이전에는 import 함수를 통해 불러온 다음 컴포넌트 자체를 state에 넣는 방식으로 구현

## 1. import 함수를 통해 불러온 다음 컴포넌트 자체를 state에 넣는 방식

- SplitMe.js

  ```
  import React from 'react';

  const SplitMe = () => {
    return <div>SplitMe</div>;
  };

  export default SplitMe;

  ```

- App.js 에서 클래스형으로 변환 후 await import로 추가

  ```
  import logo from './logo.svg';
  import './App.css';
  import { Component } from 'react';

  class App extends Component {
    state = {
      SplitMe: null,
    };

    handleClick = async () => {
      const loadeModule = await import('./SplitMe');
      this.setState({
        SplitMe: loadeModule.default,
      });
    };

    render() {
      const { SplitMe } = this.state;
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
              onClick={this.handleClick}
            >
              Hello React!
            </a>
            {SplitMe && <SplitMe />}
          </header>
        </div>
      );
    }
  }

  export default App;
  ```

  - Network 에서 확인.
  - 매번 state에서 컴포넌트를 선언해야 한다.

## 2. React.lazy와 Suspense 사용하기

- React.lazy와 Suspense를 사용하면 간편하게 코드 스플리팅 가능하다.

### React.lazy : 컴포넌트를 렌더링 하는 시점에서 비동기적으로 로딩할 수 있게 해주는 유틸 함수

> const SplitMe = React.lazy(()=> import('./SplitMe'));

### Suspense : 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고 로딩이 끝나지 않았을 때 보여줄 UI를 설정할 수 있다.

- 이 안에서 스프리팅 된 컴포넌트 선언

```
import {Suspense} from 'react';

<Suspense fallback={<div>loading...</div>}>
  <SplitMe />
<Suspense />
```

- App.js

  ```
  import React, { Suspense, useState } from 'react';

  const SplitMe = React.lazy(() => import('./SplitMe'));

  function App() {
    const [visible, setVisible] = useState(false);

    const onClick = () => {
      setVisible(true);
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p onClick={onClick}>Hello React!</p>
          <Suspense fallback={<div>loading...</div>}>
            {visible && <SplitMe />}
          </Suspense>
    ...
  ```

  - React.lazy 설정을 통해 코드 스플리팅
  - fallback을 통해 로딩중 JSX 지정하기

## 3. Loadable Components를 통한 코드 스플리팅

- Loadable Components : 코드 스플리팅을 편하게 하도록 도와주는 서드 파티 라이브러리

  - yarn add @loadable/component
  - 서버 사이드 렌더링을 지원하는 이점

- 서버 사이드 렌더링

  1. 웹 서비스의 초기 렌더링을 서버에서 처리
  2. 서버에서 렌더링한 html 결과물을 받아오기 때문에 초기 로딩 속도 개선.
  3. 검색 엔진에서 크롤링 최적화

- 사용법

  ```
  import lodable from '@loadable/component';

  const SplitMe = lodable(() => import('./SplitMe'));
    ...
      <p onClick={onClick}>Hello React!</p>
      {visible && <SplitMe />}
  ```

  - React.lazy와 비슷. Suspense는 쓸 필요 없다.
  - 로딩중 UI 보여주기

  ```
  const SplitMe = lodable(() => import('./SplitMe'), {
    fallback: <div>loading...</div>,
  });
  ```

## 3-1. 컴포넌트 미리 불러오기

- 마우스 커서를 Hello React 위에 올리기만 해도 로딩이 시작. 클릭하면 렌더링.

  ```
    const onMouseOver = () => {
      console.log('1');
      SplitMe.preload();
    };

    ...
          <p onClick={onClick} onMouseOver={onMouseOver}>
            Hello React!
          </p>
          {visible && <SplitMe />}
    ...
  ```
