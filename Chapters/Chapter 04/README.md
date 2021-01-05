## _ 책에는 클래스형 컴포넌트 위주로 설명되어서 함수형 컴포넌트로 다시 정리_

# Chapter 04 : 이벤트 핸들링

### 이벤트 : 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용 하는 것

- 마우스 커서 올리기, 클릭하기, Form 요소에서 값 바뀌면 onChange 이벤트..

# 🎯 리액트의 이벤트 시스템

## 1. 주의 사항

1. 이벤트 이름은 **카멜 표기법** ex) onclick => **onClick**, onkeyup => **onKeyUp**
2. 이벤트에 코드가 아닌 **함수 형태의 값(객체)**을 전달한다.
   - 함수 전달에 좋은 **화살표 함수** 사용
   - 렌더링 부분 외부에 미리 만들어서 전달 가능
3. DOM 요소에만 이벤트를 설정할 수 있다.
   - html 태그 같은 DOM요소에만 설정 가능
   - **컴포넌트에는 설정이 안된다**.

```
<HTML>
 1. onclick, onkeyup
 2. <button onclick = "alert('executed')">
```

```
<React>
 1. onClick, onKeyUp
 2. <button onClick = { () => { ... } }>
```

## 2. 자주 사용하는 이벤트

- 참고(https://reactjs.org/docs/events.html)

# 🎯 이벤트 핸들링 ( 함수형 컴포넌트 )

## 1. 컴포넌트 세팅

- 전체 코드 링크(https://github.com/dongwonnn/learning-react/blob/main/hello-react/src/EventPractice.js)

```
<자식 컴포넌트>
import React from "react";

const EventPractice = () => {
  return (
    <div>
      <h1>이벤트 연습</h1>
    </div>
    <input />
    <button></button>
  );
};

export default EventPractice;

<부모 컴포넌트>
import React from "react";
import EventPractice from "./EventPractice";

const App = () => {
  return <EventPractice />;
};

export default App;

```

## 2. onChange, onClick 이벤트

### onChange

- **Form 요소에서 값이 변하면** 발생하는 이벤트
- e 객체 : SyntheticEvent. 웹 브라우저의 네이티브 이벤트랄 감싸는 개체. 이벤트가 끝나면 초기화
- **e.target.value** : 입력값 구하기

### onClick

- 클릭 시 발생하는 이벤트

```
   <input
        type="text"
        name="message"
        placeholder="아무거나 입력해보세요."
        onChange={(e) => {
          console.log(e.target.value);
        }}
    />
    <button
        onClick={() => {
            alart('클릭')
        }}
      >
        확인
    </button>
```

## 3. useState(Hooks) 이용하여 input 값으로 상태값 설정, 초기화 하기

- **useState 이용하여 첫번째 인자로 현재 상태(message)와 두번째 인자로 상태를 바꾸는 함수(setMessage) 설정**
- input 태그에서 value를 이용하여 input값 표시
- 버튼의 onClick을 이용하여 현재 message 표시 후, 공백으로 초기화

```
const EventPractice = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="아무거나 입력해보세요."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          alert(message);
          setMessage('');
        }}
      >
        확인
      </button>
    </div>
  );
};
```

## 4. 임의 메서드 만들기

- 태그 안의 이벤트를 **return 밖 메서드**로 만들기
- 성능은 비슷하지만 가독성 높아짐

```
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    alert(message);
    setMessage('');
  };

  return{
      ...

              onChange={onChangeMessage}
      />
      <button onClick={onClick}>확인</button>

      ...
  }
```

## 5. input 여러 개 다루기

- input이 두개 밖에 업다면 useState()의 두번 째 인자 상태 설정 함수를 2개 써도 상관없음.
- 하지만 input이 여러 개라면 **e.target.name** 이용하여 하나의 함수로 설정
- 각각의 input 상태를 하나로 관리하기위해 **form 객체** 설정

```
const [form, setForm] = useState({
    message: '',
    username: '',
})
```

- 객체 비구조화 할당

```
const {message, username} = form;
```

- 하나로 관리할 onChange 함수
- **e.target.name에 각각 input에서 설정한 name 값**이 들어가게 됨.
- **e.target.value는 각각 input에서 입력한 input value**
- 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key로 사용된다.

```
<불변성 유지 -> Chapter 12>
const onChage = (e) =>{
    const nextForm = {
        ...form,        // 불변성 유지 위해
        [e.target.name] : e.target.value
    }
    setForm(nextForm)
}

const onClick = () =>{
    setForm({
        message: '',
        username: ''
    })
}

```

- **name은 꼭 큰 따옴표로 설정**, 함수 재설정

```
<input
    ...
    name="message"
    onChange = {onChange}
/>
<input
    ...
    name="username"
    onChange = {onChange}
/>
```

- 정리
  - 하나의 onChange 함수로 2개의 input 관리가 가능
  - e.target.name을 안쓴다면 각각의 input 개수에 맞는 useState, 상태 설정 함수를 작성해야함.

## 6. onKeyPress 이벤트

- 키를 눌렀을 때 발생하는 KeyPress 이벤트 처리
- e.key 가 Enter인 이벤트에 onClick() 함수 호출하도록 처리

```
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return{
      ...
      <input
        ...
        onKeyPress = {onKeyPress}
      >
  }
```
