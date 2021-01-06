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
