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
  - 화면 가운데 정렬 : css
  - 앱 타이틀 (일정 관리) 렌더링 : 일정 관리
  - children으로 내부 JSX를 props로 받아서 렌더링
    - App.js 에서 <TodoTemplate> ... </TodoTemplate> 사이에 TodoList 컴포넌트를 선언해 chilren으로 전달
- TodoInsert
  - 새로운 항목 입력하고 추가 기능 : input과 submit button
  - state를 통해 인풋의 상태 관리 : 기능 구현
- TodoListItem
  - 각 할 일 항목에 대한 정보를 보여주는 기능 : (un)checkbox, 할 일 text, remove button
  - todo 객체를 props로 받아와 상태에 따른 스타일의 UI를 보여주는 기능 : 기능 구현
- TodoList

  - todos 배열을 props로 받아와 map을 이용해 여러 개의 TodoListItem 컴포넌트를 변환해 보여준다. : 기능 구현

- 코드(https://github.com/dongwonnn/learning-react/tree/main/todo-app_2/src/components)

- react-icon에 대해서

  - 리액트에서 다양한 아이콘을 사용할 수 있는 라이브러리
  - 문서(https://react-icons.github.io/react-icons/icons?name=md)에서 원하는 아이콘 선택후 import
  - 사용은 컴포넌트 사용처럼 <MdCheckbox>
  - css에서 다룰땐 태그처럼 svg{ ... } 로 다루면 됨.

- checked 태그 -> 자동으로 설정

# 🎯 기능 구현

## 1. App.js 에서 기본 세팅 값 설정

## 2. TodoList.js 에서 map을 이용하여 TodoListItem 순환

## 3. TodoListItem.js 에서 checkbox 구현

## 4. TodoInsert.js 에서 항목 추가 구현

## 5. remove 기능 구현
