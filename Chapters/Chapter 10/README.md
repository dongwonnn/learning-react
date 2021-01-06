# Chapter 10 : 일정관리 웹 어플리케이션 만들기

- 컴포넌트 구조

  ```
  |App|
    ㄴ|TodoTemplate|
            ㄴ|TodoInset|
            ㄴ|TodoList|
                ㄴ|TodoListItem|

  ```

# 🎯 개발 환경 세팅

## 1. 프로젝트 및 라이브러리 설치

- yarr create react-app todo-app
- yarn add node-sass classnames react-icons

## 2. Prettier 설정

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

- index.css 수정
  ```
    body{
    margin:0;
    padding: 0;
    background: #e9ecef;
  }
  ```

# 🎯 UI 구성

## 1. 컴포넌트 설명

- 컴포넌트들은 src/components 디렉토리에 저장 ( 관습임 )

- TodoTemplate
  - 화면 가운데 정렬
  - 앱 타이틀 (일정 관리) 렌더링
  - children으로 내부 JSX를 props로 받아서 렌더링
- TodoInsert
  - 새로운 항목 입력하고 추가 기능
  - state를 통해 인풋의 상태 관리
- TodoListItem
  - 각 할 일 항목에 대한 정보를 보여주는 기능
  - todo 객체를 props로 받아와 상태에 따른 스타일의 UI를 보여주는 기능
- TodoList
  - todos 배열을 props로 받아와 map을 이용해 여러 개의 TodoListItem 컴포넌트를 변환해 보여준다.

# 🎯 기능 구현
