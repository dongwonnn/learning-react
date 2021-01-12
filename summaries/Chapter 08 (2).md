## _7장과 연관 지으면서. 개념 뒤로 갈수록 중요함_

# Chapter 08 : Hooks (2)

- 사용할 예제 코드

  ```
  import React, { useState } from 'react';

  const getAverage = (numbers) => {
    console.log('평균값 계산중');
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
  };

  const Average = () => {
    const [number, setNumber] = useState('');
    const [list, setList] = useState([]);

    const onChange = (e) => {
      setNumber(e.target.value);
    };

    const onInsert = (e) => {
      const nextList = list.concat(parseInt(number));
      //const nextList = [...list, parseInt(number)];
      setList(nextList);
      setNumber('');
    };

    return (
      <div>
        <input value={number} onChange={onChange} />
        <button onClick={onInsert}>등록</button>
        <ul>
          {list.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <div>
          <b>평균값 : </b> {getAverage(list)}
        </div>
      </div>
    );
  };

  export default Average;
  ```

# 🎯 useMemo

- 컴포넌트 내부에서 발생하는 **연산** 최소화
- 실습 코드는 insert외에 input 내용 수정되어도 getAverage함수가 호출됨
- useMemo 사용하면 **특정 값이 바뀌었을 때만 연산을 실행**, **원하는 값이 바뀌지 않았다면 이전 연산 결과를 다시 사용**

## 1. useMemo 사용

- 코드

  ```
  const avg = useMemo(() => getAverage(list), [lsit]);

  return{
    ...
    <b>평균 값 : </b> {avg}
  }
  ```

  - useMemo 첫 번째 인자에 화살표 함수를 이용한 최적화 함수, 두 번째 인사에 **관심사** 적용
  - useMemo를 적용한 함수를 반환하는 변수 설정

# 🎯 useCallback

- 만들어 놨던 **함수 재사용**
- **렌더링 성능 최적화**
- 그냥 함수 선언하면 렌더링 할 때마다 함수 다시 렌더링
- **useCallback 사용하면 처음 렌더링 했을 때 만들어 놓은 함수 리렌더링 시 다시 안만들고 재사용**
- **두 번째 인자로 업데이트 된 상태 적용하면, 그때만 리렌더링할 때 함수 다시 생성**

## 1. useCallback 사용

- 코드

  ```
    const onChange = useCallback((e) => {
      setNumber(e.target.value);
    }, []);

    const onInsert = useCallback(
      (e) => {
      const nextList = list.concat(parseInt(number));
      //const nextList = [...list, parseInt(number)];
        setList(nextList);
        setNumber('');
      },
      [number, list]
    );
  ```

  - useCallback으로 감싼 후, **두 번째 인자로 어떤 값이 변할때 함수를 새로 설정**해야 하는지
  - **빈 배열은 처음 렌더링할 때만 렌더링. 리렌더링 되어도 호출 안됨.**
  - **[number, list] 경우 number가 입력되거나, list가 추가 되었을 때 리렌더링 된다면 호출 될때마다 다시 렌더링**

## useMemo와 useCallback의 차이점 ? ?

- **useMemo : 특정 상태 업데이트 될 때만 연산 호출되게 최적화**
- **useCallback : 특정 상태 업데이트 될 때 렌더링될 것 선택해서 렌더링 성능 최적화**

# 🎯 useRef

## 1. ref로 DOM 접근하기

```
const inputEl = useRef(null);

const onInsert = useCallback(e => {
  ...
  inputEl.current.focus();
})

<input value={number} onChange={onChange} ref={inputEl} />
<button onClick={onInsert}>등록</button>
```

## 2. 로컬 변수 사용하기

- **로컬 변수 : 렌더링과 상관없이 바뀔 수 있는 값**

  ```
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current)
  }
  ```

  - 사용할 때 한번 보기...

# 🎯 커스텀 Hooks 만드는 법

- 만들때 보기

# 🎯 다른 Hooks

- 참고(https://nikgraf.github.io/react-hooks/)
- 참고(https://github.com/rehooks/awesome-react-hooks)
