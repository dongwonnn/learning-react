# Chapter 09 : 컴포넌트 스타일링

- css : 기본 방식
- Sass : CSS 전처리기.
- CSS Module : CSS 클래스 충돌하지 않도록 **고유한 이름 자동 생성**
- Styled-components : **스타일을 JS 파일 안에 내장**

# 🎯 일반 CSS

- CSS 클래스 중복되지 않게 만들기

## 1. 특별한 규칙 짓기

- 이름을 컴포넌트-이름, 컴포넌트-클래스와 같이
- BEM 네이밍. 용도에 맞춰 .card\_\_title-primary

## 2. CSS selector 활용

- 특정 클래스 내부에 있는 경우에만 스타일 적용하기
  - .App .logo 처럼 .App 클래스 내부에 .logo만 적용하게 만들기

# 🎯 Sass 사용하기

## 1. 개념

- 복잡한 작업 쉽게, 스타일 코드의 재활용성, 가독성 높여 유지보수 쉽게
- .scss와 .sass가 있지만 css 문법과 비슷한 **.scss** 사용
- 설치 : yarn add node-sass@4.14.1
  - 그냥 yarn add node-sass 는 버전 에러 생김
  - yarn remove node-sass로 삭제한 후 재 설치
- 변수 사용하기
  ```
      $red: $fa5252;
      ...
      background: $red
  ```
  - 변수처럼 사용가능함
- CSS selector 편리하게 사용
  - **클래스{} 안에 클래스 적용**하면 동일한 기능.
  - SassComponet 클래스 안에 있는 .box 클래스 사용
  ```
  .SassComponent{
      .box{
          ...
      }
  }
  ```
  - box 이면서 red 일때 ex) <div className="box red"></div>
  ```
  .SassComponent{
      .box{
          &.red
      }
  }
  ```
- **mixin : 재사용되는 스타일 블록을 함수처럼 사용가능**

  - @mixin 함수이름($파라미터){
    css 속성
    }
    ```
    @mixin square($size){
        $calculation: 32px * $size;
        width:$calculation;
        height: $calculation;
    }
    ```
  - 적용하기

  ```
    &.red{
        @include square(1)
    }
  ```

- 스타일 적용하는 JS에 import './SassComponent.scss'

## 2. utils 함수 분리

- Sass변수, 믹스인을 다른 파일로 따로 분리.
- ./src/styles/utils.scss 파일안에 변수, 믹스인 정리
- SassCompoent.scss 파일에 import './styles/utils';

## 3. sass-loader 설정 커스터마이징하기

- 프로젝트 폴더 구조가 깊어졌다면 그 파일에 접근하기 위해 ../../../ 이런식으로 복잡해진다.
- **sass-loader 커스타마이징**으로 해결이 가능하다.
- 순서

  1. 먼저 git에 커밋하기
  2. yarn eject -> react-script eject -> y
  3. 생성된 config 폴더에 webpack.config.js파일 -> sassRegex 찾기
  4. 'sass-loader' 지우고 다음 코드 추가
     ```
     concat({
             loader: require.resolve('sass-loader'),
             options: {
               sassOptions: {
                 includePaths: [paths.appSrc + '/styles'],
               },
               sourceMap: isEnvProduction && shouldUseSourceMap,
               //prependData: `@import 'utils';`,
             },
           }),
     ```
  5. 서버 재시작

- sass-loader을 커스터마이징 했다면 @import 'utils.scss' 만 적으면 된다.
  - 더 편하게 위의 //prependData: `@import 'utils';`, 주석을 지우면 알아서 import 해준다.

## 4. node_modules에서 라이브러리 불러오기

- Sass를 통해 라이브러리를 쉽게 불러올 수 있다.
- @import '../../../node_modules/library/styles' 로 불러오기
- ~문자 이용해서 @import '~/library/styles'로 간단하게
- 반응형 디자인 라이브러리와 편리한 색상 팔레트 라이브러리 설치
  - yarn add open-color include-media
  - @import '~inlcude-media/dist/include-media'
  - @import '~open-color/open-color'
  - 공식 매뉴얼 보고 사용하기

# 🎯 CSS Module

- 클래스 이름을 고유한 값으로 자동으로 생성해줌
  - [파일 이름]\_[클래스 이름]\_\_[해시값] 형태
  - 이름이 중첩되는 현상을 방지

## 1. CSS파일로 Module 만들기

- 파일이름 **.module.css 확장자**로 저장하면 알아서 작동
- CSSModule.module.css
  ```
  .wrapper{
      ...
  }
  :global .something{
      ...
  }
  ```
  - CSSModule_wrapper\_\_1dasg 이런 식으로 고유하게 생성됨
- 해당 JS 파일에서

  ```
  import style from './CSSModule.module.css'

  <div classNames={styles.wrapper}>
  ```

- global로 전역 스타일을 지정할 수 있다.

  - 사용은 그냥 문자열로 넣으면 됨.

  ```
  <span classNames="something">
  ```

- 클래스를 두 개 이상 넣어야 할 때

  ```
  <CSS>
  .wrapper{
      ...
  }

  .inverted{
      ...
  }

  <JS>
  <div classNames={`${styles.wrapper} ${styles.inverted}`}>
  ```

## 2. classnames로 css 클래스 조건부 설정하기

- 설치 : yarn add classnames
- **true, false로 설정할 지 안할 지**를 쉽게 정할 수 있음
- ex)
  ```
  classnemes('one','two') // one two
  classnemes('one', {two: true})  // one two
  classnemes('one', {two: false}) // one
  ```
- 적용
  ```
  <div className={classnames('MyComponent',{highlight}, theme)}>
  ```
  - 이 경우 highlight가 props라면 true, false에 의해 보여짐
  - theme은 문자열이라 하면 내용 그대로 쓰면 적용됨
  - classnames안 쓴다면,
    ```
    <div className={classnames(`MyComponent ${theme} {hightlight ? 'highlight' : ''}`)}>
    ```

## 3. CSS Module과 같이 사용하기

- **bind 함수를 사용하여 CSS Module의 styles.[클래스 이름]에서 styles.를 제거**
- 코드

  ```
  import classNames from 'classnames/bind'
  import styles from './CSSModule.module.css'

  cosnt cx = classNames.bind(styles)

  <div className={cx{'wrapper', 'inverted'}}>
  ```

- SCSS도 module로 만들어 쓸 수 있음.

  - module.scss로 파일 이름 바꾸기
  - import styles from './CSSModule.module.scss'

- CSS Module이 아닌데 쓰는 방법
  - 일반 파일 확장자 ( Module.css, Module.scss를 안쓴)
  - 클래스 앞에 **:local** 붙이기
    ```
    :local .wrapper
    ```

# 🎯 Styled-components

- **자바스크립트 파일 안에 스타일 선언하기** ( CSS-in-JS 방식 )
- 여러 라이브러리 중 **Styled-components**
- 설치 yarn add styled-components

- 사용법

  ```
  import styled, {css} from 'styled-components';

  const Box = styled.div`
    background: ${props => props.color || 'blue'}
  `;

  <Box color="black">
  ```

  - 컴포넌트 처럼 스타일을 **함수**로 선언해 사용할 수 있음

## 코드 분석

## 1. Tagged 템플릿 리터럴

- **Tagged 템플릿 리터럴** : 함수를 선언하고 ` `로 만든 문자열에 스타일 정보 넣음
- 일반 템플릿 리터럴과 비교했을 때 장점
  - **자바스크립트 객체나 함수를 전달할 때 온전히 추출할 수 있다.**
  - Tagged : const Box = `~~`;
  - 일반 : `~~`

## 2. 스타일링된 엘리먼트 만들기

- styled-components를 사용해 styled 불러오고 styled.태그명 사용
  ```
  const MyComponent = styled.div`
      ...
  `
  ```
  - 해당 스타일이 적용된 div 생성
- 태그명이 유동적일 때는 **태그의 타입**을 함수의 인자로 전달
  ```
  const MyInput = styled('input');
  ```
- 특정 컴포넌트 자체를 스타일링
  ```
  const StyledLink = styled(Link)``
  ```

## 3. 스타일에서 props 조회하기

- 컴포넌트에게 전달된 props값 참조 가능

  ```
  const Box = styled.div`
      background: ${props => props.color || 'blue'}
  `;

  <Box color="black">
  ```

## 4. props에 따른 조건부 스타일링

- 코드

  ```
  const Button = styled.button`
  ~~~

  ${props =>
      props.inverted &&
      css`

      `
  };

  <Button inverted= {true}>테두리만</Button>
  `
  ```

  - inverted의 props로 조건 설정
  - 스타일 코드 여러줄을 props에 따라 넣어줄 땐 **CSS를 import 해서 Tagged 템플릿 리터럴로 사용해야함**

## 5. 반응형 디자인 설정

- styled-components 안에서 쉽게 설정가능

  ```
  const Box = styled.div`
      width: 1024px;
      margin : 0 auto;
      @media (max-width: 1024px){
          width: 768px
      }
  `
  ```

- 함수화해서 사용할 수 있음
  - styled-components에서 제공하는 유틸 함수 -> 쓸 일 있을때 찾아보기
