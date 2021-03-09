# React

## 프로젝트 생성

    ```
    yarn create react-app "프로젝트 이름"
    npm install react-app "프로젝트 이름"
    ```

## VSCode 확장 프로그램

1.  ESLint : 자바스크립트 문법, 코드 스타일 검사.
2.  Reactjs Code Snippers : 단축 단어 자동 생성.
3.  Prettier-Code formatter : 코드 스타일 자동 정리

## Prettier 설정

- .prettierrc 파일
  ```
  {
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
  }
  ```

## sass 설치

- yarn add node-sass@4.14.1

## sass-loader 설정 커스터마이징하기

- 프로젝트 폴더 구조가 깊어졌다면 그 파일에 접근하기 위해 ../../../ 이런식으로 복잡해진다.
- sass-loader 커스타마이징으로 해결이 가능하다.
- 순서
  1. 먼저 git에 커밋하기
  2. yarn eject -> react-script eject -> y

## node_modules에서 라이브러리 불러오기

- Sass를 통해 라이브러리를 쉽게 불러올 수 있다.
- @import '../../../node_modules/library/styles' 로 불러오기
- ~문자 이용해서 @import '~/library/styles'로 간단하게
- 반응형 디자인 라이브러리와 편리한 색상 팔레트 라이브러리 설치
  - yarn add open-color include-media

## classnames로 css 클래스 조건부 설정하기

- 설치 : yarn add classnames

## Styled-components

- 자바스크립트 파일안에 스타일 선언하기 ( CSS-in-JS )
- 라이브러리 중 Styled-components
- 설치 yarn add styled-components

## 프로젝트 및 라이브러리 설치

- yarr create react-app todo-app
- yarn add node-sass classnames react-icons
- react-icons : SVG 형태 아이콘 쉽게 사용

## 자동 import 되게 하기

- jsconfig.json에 아래 코드 작성

  ```
  {
      "compilerOptions": {
          "target": "es6"
      }
  }
  ```

## react-virtualized를 사용한 렌더링 최적화

- react-virtualized

  - 스크롤되기 전에 보이지 않는 컴포넌트들 렌더링하지 않고 크기만 차지하게끔 한다.
  - 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트 자연스럽게 렌더링

- 설치 : yarn add react-virtualized

## immer 라이브러리

- 설치 : yarn add immer

## 리덕스, react-redux, redux-actions 라이브러리 설치

- 설치 : yarn add redux react-redux redux-actions

## Loadable Components를 통한 코드 스플리팅

- Loadable Components : 코드 스플리팅을 편하게 하도록 도와주는 서드 파티 라이브러리
  - yarn add @loadable/component

## Chpater 17. 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

- 설치 : yarn add redux react-redux
- Redux DevTools 설치 : yarn add redux-devtools-extension
- 액션 생성 함수 더 짧게 : yarn add redux-actions

## Chapter 18. Redux saga

## 제너레이터 함수

### 일반 함수와의 차이점

제너레이터 함수 코드

```
function* quips(name){
  yield "hello" + name + "!";
  yield "I hope you are enjoying the blog posts";
  if(name.startsWith('X')) {
    yield "it's cool how your name starts with X," + name;
  }
  yield "See you later!";
}
```

- 일반 함수 : `function` 키워드, 제너레이터 함수 `function*` 키워드
- 제너레이터 함수엔 yield 구문 존재. return과 비슷. 차이점은 return 구문은 한번만 실행, yield는 여러번 실행된다. **_yield 구문은 제너레이터의 실행을 멈췄다가 다음에 다시 시작할 수 있게 만든다. _**

### 제너레이터 함수 동작 방식

```
> var iter = quips("jorendorff");
  - [object Generator]
> iter.next()
  - { value: "hello jorendorff!", done: false }
> iter.next()
  - { value: "i hope you are enjoying the blog posts", done: false }
> iter.next()
  - { value: "see you later!", done: false }
> iter.next()
  - { value: undefined, done: true }
```

1. 처음 제너레이터 함수 호출 시
   바로 실행되지 않고 멈춰진 제너레이터 객체를 리턴한다. (iter 변수)
2. 제너레이터 객체의 next() 메소드 호출
   다음번 yield 구문에 다다를 때 까지 실행된다. ( hello jorendorff! )
3. 제너레이터 함수의 마지막에 도달하면 ( 실행할 yeild 구문이 없다면 ) done : true, value:undefined 리턴

### 응용

```
function* sumGenerator(){
  let a = yield;
  let b = yield;
  yield = a+b;
}

const sum = sumGenerator();
sum.next();먹ㅇ
sum.next(1);  // a = 1
sum.next(2);  // b = 2
sum.next();
```

- Redux에서 next({type: [ACTION TYPE]) 으로 사용 가능

### 제너레이터 함수의 특징

1. 제너레이터가 끝에 다다르기 전에 제너레이터 함수이 yield를 추가해도 반영이 안된다
   제러네이터의 yield 구문이 실행될 때 제너레이터의 스택 프레임에서 제거 되지만, 제너레이터 객체는 스택 프레임의 참조를 유지하고 있다가 next() 호출 때 재활성해 실행을 계속한다.
2. 제러네이터는 쓰레드가 아니다.
   코드를 동시에 실행시키지 않고 제너레이터랄 호출하는 코드와 같은 쓰레드에서 실행된다. 이로인해 정의된 순서대로 실행되며 여러 코드가 동시에 실행되지 않는다. yield 구문에 의해서만 실행을 멈춘다.
3. 제러네이터는 이터레이터다.
