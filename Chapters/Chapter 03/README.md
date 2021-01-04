# Chapter 03 : 컴포넌트

# 🎯 컴포넌트

1. 단순한 템플릿 이상
2. 데이터가 주어졌을 때 이에 맞추어 UI개발
3. 라이프사이클 API 적용 가능
4. **클래스형 컴포넌트, 함수형 컴포넌트** 2가지 유형 존재

---

# 🎯 클래스형 컴포넌트, 함수형 컴포넌트 비교

## 1. 클래스형 컴포넌트

- state 기능, 라이프사이클 기능, 임의 메서드 정의 가능
- render() 함수 호출을 통해 렌더링
- 단축기 rcc
  ```
  const App(){
      return ();
  }
  ```

## 2. 함수형 컴포넌트

- state, 라이플사이클 API 사용 불가능 -> **Hooks** 기능으로 해결
- 선언하기 용이, 메모리 자원 효율성, 결과물의 파일 크기 감소
- 단축기 rsc

  ```
  function App(){
      return ();
  }
  ```

---

# 🎯 컴포넌트 생성

## 1. 구성

```
import React from 'react';

const App = () => {
    return ();
}

export default App;
```

- ES6의 화살표 함수
  - 함수를 표현하는 새로운 방식
  - 주로 **함수를 파라미터로 전달할 때** 유용
  - this 비교
    1. function : 자신이 종속된 객체의 this를 가리킴
    2. 화살표 함수 : 자신이 종속된 인스턴스의 this를 가리킴

## 2. 모듈 내보내기, 불러오기

- 내보내기 ( exprot )
  - 다른 파일에서 import 할 때 불러오도록 설정
  - export default App;
- 불러오기 ( import )
  - import App from './App';

---

# 🎯 props

- **컴포넌트 속성**을 설정할 때 사용
- **해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정**

## 1. 부모 컴포넌트에서 props 값 지정하고 자식 컴포넌트에서 props 렌더링

- 부모 컴포넌트에서 props 지정
- name은 props 이름. React는 props

```
import MyComponent from './MyComponent'
const App = () =>{
    return <MyComponent name="React">
}
```

- 자식 컴포넌트에서 props 렌더링
- 함수의 파라미터로 받아 온다.
- JSX 내부에서 { props.이름 }

```
const MyComponent = (props) =>{
    return <div>안녕하세요 제 이름은 {props.name}입니다.</div>
}
```

## 2. 기본값 설정 : defaultProps

- props 값을 지정하지 않았을 때 보여줄 기본값.
- 자식 컴포넌트 함수 밑에 설정
- **MyComponent.defaultProps = { props 이름 : defalut 값}**

```
const MyComponent = (props) => {
    ...
}

MyComponent.defaultProps = {
    name : '기본 이름'
}

```

## 3. 태그 사이의 내용을 보여주는 children

- props 기본 속성. { props.children }
- **부모 컴포넌트 사이의 값**을 자식 컴포넌트에서 호출 하고 싶을 때

```
<부모 컴포넌트>
const App = () =>{
    // 태그 사이의 값 '리액트'
    return <MyComponent>리액트</MyComponent>
}

<자식 컴포넌트>
const MyComponent = (props) =>{
    return <div>children 값은 {props.children}</div>
}

```

## 4. ES6 비구조화 할당 문법

- **객체**에서 값을 추출하는 문법
- 키워드 간소화하여 편하게 작성 가능

```
<부모 컴포넌트>
const {name, children} = props;
props.name 대신 name
props.children 대신 children
```

- **파라미터**에서도 사용 가능

```
<자식 컴포넌트>
const MyComponent({name, children})
```

## 5. propsTypes를 이용한 props 검증

### ✔ 큰 규모의 프로젝트를 위해 사용하는 습관 !

- 필수 props 지정, props 타입 지정
- 지정한 string 외에 다른 타입은 경고

```
MyComponent.propTypes ={
    name: PropTypes.string
}
```

- **isRequired**. defaultProps 설정하지 않았을 때

```
MyComponent.propTypes ={
    favoritNumber : PropTypes.number.isRequired
}
```

## 6. 클래스형 컴포넌트에서 props 사용하기

- render 함수에서 **this.props** 사용

```
render(){
    const {name, favoritNumber, children} = this.props;
}
```

---

# 🎯 state

- **컴포넌트 내부에서 바뀔 수 있는 값**.
- 클래스형 컴포넌트의 **state**
- 함수형 컴포넌트의 **useState** (Hooks)

### cf) props

- 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값.
- 자식 컴포넌트는 읽기 전용으로만 사용 가능.
- props를 바꾸려면 부모 컴포넌트에서 바꿔야함.

## 1. 클래스형 컴포넌트의 state

### constructor 사용

- state 설정하기 위해 constructor 메서드 사용 ( 생성자 메서드 )
- super(props) : 클래스형 컴포넌트가 상속받고 있는 리액트의 component 메서드의 생성자 함수 호출
- this.state를 이용하여 초기값 설정
- state는 반드시 객체 형식

```
import {Component} from 'react';

constructor(props){
    super(props);
    this.state ={
        number: 0,
        fixedNumber: 0
    };
}
```

### this.setState를 이용하여 객체로 값 설정

- state의 값을 바꿀 땐 주로 이벤트 시스템을 이용
- [Chapter_04\_이벤트\_핸들링](https://github.com/dongwonnn/learning-react/tree/main/Chapters/Chapter%2004)

```
<button onClick = {()=> {
    this.setState({number: number +1 })
}}
```

### constructor 제거

- constructor 제거하고 간편하게 설정

```
state = {
    number: 0,
    fixedNumber: 0
}
```

### setState 안에 객체 대신 함수 인자 전달

- this.setState는 **비동기적**으로 업데이트 된다.
- 따라서 같은 state를 두 번 연속으로 호출하면 뒤의 state가 적용 안됨.
- 해결하기 위해 함수 인자를 전달하기
- `prevState` : 기존상태 `props` : 현재 지니고 있는 props. 안쓴다면 생략가능

```
<button
    this.setState((prevState, (props))=>{
    return {
        number: prevState.number + 1;
    }
})
></button>
```

### setState가 끝난 후 특정 작업 실행하기

- setState의 두번째 파라미터로 콜백함수 등록

```
this.setState({
    number:number+1
}, ()=>{
    // 콜백함수
    }
)
```

## 2. 함수형 컨포넌트에서 useState 사용하기

- **배열 비구조화 할당 문법**

```
const array = [1,2];
const one = array[0]
const two = array[1]

// 아래 코드와 동일하다.

const array = [1,2];
const [one, two] = array;
```

- useState 함수 ( 세터 함수 )
  - const [현재 상태, 상태 바꿔주는 함수] = useState(state 의 초기값)
  - 특정 이벤트 함수에 상태 바꿔주는 함수로 state값 변경
  - 여러번 사용 가능

```
    import {useStata} from 'react';

    const Say = () => {
        const [message, setMessage] = useState('');
        const onClickEnter = () => setMessage('안녕하세요!')
        const onClickLeave = () => setMessage('안녕히 가세요!')
    }
```

[Chapter_08_Hooks](https://github.com/dongwonnn/learning-react/tree/main/Chapters/Chapter%2008)

---

# 🎯 state를 사용할 때 주의사항

- state 값을 바꿀 때 **세터 함수**를 사용해야 한다. 직접적으로 바꾸면 안됨.
- **배열이나 객체를 업데이트 하는 과정**
  1. **배열, 객체 사본을 만든다. ( spread 연산자 )**
  2. **사본에 값을 업데이트 한 후 사본의 상태를 setState, 세터 함수를 이용해 업데이트 ( 배열의 내장함수들. map, filter ..)**
  ```
  const array = [
      {id : 1, value : true},
      {id : 2, value : false},
      {id : 3, value : true},
  ]
  let nextArray = array.concat({id:4})          // id가 4인 객체 추가
    nextArray.filter(item => item.id !== 2)     // id가 2인 객체 제거
    nextArray.map(item => item.id === 1 ? {...item, value:false})
    // id가 1인 객체 값을 false로 변경
  ```
