# Chapter 02 : JSX

## 🎯 JSX란?

- 자바스크립트의 확장 문법.
- 브라우저에서 실행되기 전에 번들링 되는 과정에서 바벨을 사용해 일반 자바스크립트 형태의 코드로 변환된다.

### JSX의 장점

1. 보기 쉽고 익숙하다
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
2. 높은 활용도
   - HTML 태그 뿐 아니라 컴포넌트도 JSX 안에 작성 가능
     ```
         return{
             <div>
                 <SampleComponent />
             <div>
         }
     ```

### JSX 문법

1. 감싸인 요소
2. 자바스크립트 표현
3. if문 대신 조건부 연산자
4. && 연산자를 사용한 조건부 렌더링
5. undefined 렌더링하지 않기
6. 인라인 스타일링
7. class 대신 className
8. 꼭 닫아야 하는 태그
9. 주석

### ESLint, Prettier 적용하기

1. ESLint
2. Prettier

### 코드 분석
