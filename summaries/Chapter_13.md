# Chapter 13 : 리액트 라우터로 SPA 개발하기

# 🎯 SPA란?

- 기존 방식
  - 다른 페이지로 이동할 때 마다 새로운 html, 페이지 로딩 시 서버에서 리소스 전달받아 해석한 뒤 화면 보여줌
  - 사용자에게 보이는 화면은 서버 측에서 준비.
  - 유동적인 html 생성해주는 템플릿 엔진 사용
  - 서버 측에서 모든 뷰를 준비한다면 성능상의 문제가 발생
  - 바뀌지 않은 부분까지 새로 불러와 불필요한 로딩이 있어 비효율적
- Single Page Application : 말 그대로 한 개의 페이지로 이루어진 애플리케이션
  - **뷰 렌더링을 사용자의 브라우저가 담당**.
  - 애플리케이션을 브라우저에 불러와서 실행시킨 후 사용자와의 인터랙션이 발생하면 **필요한 부분만 자바스크립트**를 이용하여 업데이트
  - 새로운 데이터가 필요하다면 **서버 API를 호출하여 필요한 데이터만** 새로 불러와 애플리케이션을 사용할 수 있다.

### 라우팅

- 다른 주소에 다른 화면을 보여 주는 것
- 싱글 페이지라고 해서 화면이 한 종류는 아니다. 해당 페이지에서 로딩된 자바스크립트와 현재 사용자 **브라우저의 주소 상태에 따라 다양한 화면**을 보여 줄 수 있다.
- 리액트 라우팅 라이브러리
  - **리액트 라우터**
  - **Next.js**

## 1. SPA 단점

- 앱의 규모가 커지면 자바스크립트 파일이 너무 커진다.
  - 페이지 로딩 시 사용자가 실제로 방문하지 않을 수 있는 페이지의 스크립트도 불러오기 때문
  - **코드 스플리팅**을 사용해 라우트별로 파일들을 나누어 트래픽과 로딩 속도 개선
- **일반 크롤러가 페이지의 정보를 제대로 수집해 가지 못한다.**
  - 브라우저에서 자바스크립ㅌ를 사용하여 라우팅을 관리하기 때문에
  - **서버 사이드 렌더링**으로 해결

# 🎯 라우터 프로젝트 준비 및 기본적인 사용법

## 1. 프로젝트 설치, 라이브러리 설치

- 해당 디렉토리에 yarn add react-router-dom

## 2. 프로젝트에 적용

- import { BrowserRouter } from 'react-router-dom'
- src/index.js에서 React.strictMode 대신 BrowserRouter 컴포넌트로 감싸준다.
- BrowserRouter 컴포넌트 : HTML5의 history API를 이용하여 페이지를 새로고침하지 않아도 주소를 변견하고, props를 쉽게 조회, 사용 가능하게 해준다.

## 3. 라우팅 구현

- 처음 보여줄 Home 컴포넌트 생성, 웹 사이트를 소개하는 About 컴포넌트 생성
- Router 컴포넌트 사용해 현재 경로에 따라 다른 컴포넌트 렌더링

  - **규칙 : <Route path="주소 규칙" component={보여 줄 컴포넌트}>**

  ```
  // App.js
  import About from './About'
  import Home from './Home'
  import {Route} from 'react-router-dom'
  ...
  return (
      <div>
          <Route path='/' component={Home}>
          <Route path='/about' component={About}>
      </div>
  )

  ```

- 이 경우 about 페이지에 HOME 컴포넌트도 함께 렌더링 된다.
  - /about 경로가 / 규칙에도 일치하기 때문
  - Home 위한 Route 컴포넌트를 사용할 때 exact라는 props를 true로 설정
    > `<Route path='/' component={Home} exact={true}>`

## 4. Link 컴포넌트 사용하여 다른 주소로 이동하기

- 일반 웹 페이지 : a 태그 사용
- 리액트에서는 a 태그 사용하면 안된다.
  - **페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 가지고 있는 상태들을 모두 날려 버린다.**
  - 렌더링된 컴포넌트들도 모두 사라지고 처음부터 렌더링한다.
- Link 컴포넌트
  - LiNK 컴포넌트를 사용하면 페이지를 새로 불러오지 않고 **애플리케이션은 그대로 유지한 상태로 HTML5 History API를 이용하여 페이지의 주소만 변경해 준다.**
  - Link 컴포넌트 자체는 a 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다.
    > `<Link to="주소">내용</Link>`
- Link 설정

  ```
  return (
      <div>
          <ul>
              <li>
                  <Link to="/">홈</Link>
              </li>
              <li>
                  <Link to="/about">소개</Link>
              </li>
          </ul>
          <Route path='/' component={Home}>
          <Route path='/about' component={About}>
      </div>
  )
  ```

# 🎯 Route 하나에 여러 개의 path 설정하기

- Route 하나에 여러 개의 path 설정

  - 다른 페이지 경로에 동일한 컴포넌트를 보여주는 기능

  ```
  // Route 하나당 컴포넌트 설정
  <Route path='/' component={Home} exact={true}>
  <Route path='/about' component={About}>
  <Route path='/info' component={About}>

  // Route 하나에 여러 path 설정
  <Route path='/' component={Home} exact={true}>
  <Route path={['/about', '/info']} component={About}>
  ```

# 🎯 URL 파라미터와 쿼리

- 유동적인 값 전달할 때
  - **파라미터 : 특정 ID, 이름을 사용하여 조회할 때**
  - **쿼리 : 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때**

## 1. URL 파라미터

- 뒷부분에 유동적인 username 값을 넣어 줄 때 해당 값을 props로 받아 와서 조회하는 방법
- App.js

  ```
  <li>
      <Link to="/profile/velopert">velopert 프로필</Link>
  </li>
  <li>
      <Link to="/profile/dongwon">dongwon 프로필</Link>
  </li>

  <Route path="/profile/:username" component={Profile} />
  ```

  - Route path의 **/:username**을 통해 Profile 컴포넌트에 props를 전달한다.
  - 이 때 Link에 있는 **/velopert, /dongwon이 username 값으로 Profile 컴포넌트에 props에 전달**

- Profile.js

  ```
  const data = {
    velopert: {
        name: '김민준',
        description: '리액트 저자',
    },
    dongwon: {
        name: '김동원',
        description: '공부 중',
    },
  };
  ```

  ```
  const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
      return <div> 존재하지 않는 사용자입니다.</div>;
  }

    return (
        <div>
        <h3>
            {username}({profile.name})
        </h3>
        <p>{profile.description}</p>
        </div>
    );
  };
  ```

  - App.js 에서 전달받은 props : match.params.username = velopert 혹은 dongwon

## 2. URL 쿼리

- location 객체

  - location 객체 안의 **search값**에서 쿼리 조회 가능
  - 라우트로 사용된 컴포넌트에게 props로 전달.
  - 웹 애플리케이션의 **현재 주소에 대한 정보**를 가지고 있다.
  - localhost:3000/about?detail=true 주소 일 때

  ```
  {
      "pathname": "/about",
      "search": "?detail=true"
      "hash" : ""
  }
  ```

  - 문자열 형태로 이루어져 있다. 특정 값을 불러오기 위해 **문자열을 객체 형태로 변환**
    - **qs 라이브러리.**
    - yarn add qs

- About.js

  - localhost:3000/about?detail=true 로 들어갔을 때

  ```
  const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
  });

  const showDetail = query.detail === 'true';
  ```

  - ignoreQueryPrefix: true, 를 통해 앞의 ?를 제거
  - -> query는 "detail=true"

# 🎯 서브 라우트

- 서브 라우트: **라우트 내부에 또 라우터**를 정의하는 것

  - 라우터 내부에 라우터를 사용하면 된다.

- Profiles.js

  ```
    <ul>
      <li>
        <Link to="/profiles/velopert">velopert</Link>
      </li>
      <li>
        <Link to="/profiles/dongwon">dongwon</Link>
      </li>
    </ul>

    <Route
      path="/profiles"
      exact
      render={() => <div>사용자를 선택해 주세요.</div>}
    />
  ```

  - Route를 이용해 컴포넌트 뿐만 아니라 **JSX도** 전달할 수 있음.
  - exact 기본 값은 true

- App.js

  ```
  <li>
      <Link to="/profiles"> 프로필</Link>
  </li>
    ...
  <Route path="/profiles" component={Profiles} />
  ```

# 🎯 리액트 라우터 부가 기능

## 1. history - 클래스형 컴포넌트

- **history 객체**
  - 컴포넌트에 match, location과 함께 전달되는 props 중 하나
  - 컴포넌트 내에 구현하는 메서드에서 라우터 API 호출 가능
    - ex) 뒤로가기, 화면 전환, 다른 페이지 이탈 방지

## 2. withRouter 컴포넌트

- **라우터로 사용된 컴포넌트가 아니어도 match, location, history 사용** 가능

  - 주소 경로가 없는 컴포넌트도 사용이 가능하다.

- WithRouterSample.js

  ```
  import { withRouter } from 'react-router-dom';

  const WithRouterSample = ({ location, match, history }) => {
      return (
          <div>
          <h4>location</h4>
          <textarea
              value={JSON.stringify(location, null, 2)} // 들여쓰기가 적용된 상태로 문자열 만들어줌
              rows={7}
              readOnly={true}
          />

          <h4>match</h4>
          <textarea
              value={JSON.stringify(match, null, 2)}
              rows={7}
              readOnly={true}
          />
          <button onClick={() => history.push('/')}>홈으로</button>
          </div>
      );
  };

  export default withRouter(WithRouterSample);
  ```

  - 라우트 기능이 없지만 withRouter를 사용하여 location, match, history 사용
  - textarea를 통해 location, match를 확인. 버튼을 이용해 histroy 기능 확인 가능하다.
  - export 할 때 withRouter(WithRouterSample)로 감싸준다.
  - match객체의 param은 현재 자신을 보여 주고 있는 라우트 컴포넌트를 기준으로 match가 전달.
    - Profile과 Profiles에 넣어보고 비교

## 3. Switch 컴포넌트

- 여러 Route를 감싸서 그 중 일치하는 **단 하나의 라우터**만 렌더링
  - **모든 규칙과 일치하지 않을 때 Not Found 페이지**도 구현 가능
- App.js
  ```
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path={['/about', '/info']} component={About} />
          <Route path="/profiles" component={Profiles} />
          <Route
          render={({ location }) => (
              <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
              </div>
          )}
          />
        </Switch>
  ```

## 4. NavLink

- **현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일, CSS 클래스를 적용**할 수 있는 컴포넌트
- NavLink가 활성화되어 스타일을 적용할 때는 activeStyle을, CSS 클래스를 적용할 때는 activeClassName을 props로 넣어 준다.

- Profiles.js

  ```
  const activeStyle = {
      background: 'black',
      color: 'white',
  };
  ```

  ```
  <li>
      <NavLink activeStyle={activeStyle} to="/profiles/velopert">
        velopert
      </NavLink>
  </li>
  ```

  - props로 velopert를 전달했을 때 활성화되는 activeStyle 설정
