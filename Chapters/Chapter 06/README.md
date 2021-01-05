# Chapter 06 : 컴포넌트 반복

# 🎯 자바스크립트 배열의 map() 함수

- map()을 이용하여 반복 되는 **컴포넌트**를 렌더링
- 파라미터로 전달된 **함수를 이용하여** 배열 내 각 요소를 원하는 규칙에 따라 변환
- **결과로 새로운 배열을 생성한다.**

## 1. 데이터 순회 ( map() )

- arr.map(callback, [thisArg])

  - callback
    1. **currentValue** : 현재 처리중인 요소
    2. **index** : 현재 처리중인 요소의 index 값
    3. array : 현재 처리하고 있는 원본 배열
  - thisArg
    callback 함수 내부에서 사용할 this 레퍼런스

- **새로운 배열을 return** 하기 때문에 변수 생성 후 사용 -> **불변성 유지**
- map 안에 함수를 이용하여 원하는 규칙 return
- function(num)의 num은 numbers의 첫번째 index부터 마지막 index까지 **순회**한다.

```
var numbers = [1,2,3,4,5];

var processed = numbers.map((num)=>{
    return num*num
})

// processed = [1,4,9,16,25]
```

# 🎯 데이터 배열을 컴포넌트 배열로 변환하기

## 1. 컴포넌트 수정하기

```
const IterationSample = () => {
    const names = ['눈사람', '얼음', '눈' ,'바람'];
    const nameList = names.map((name)=>{
        return <li>{name}</li>
    })

    retrun <ul>{nameList}</ul>
}
```

- JSX 코드인 <li>{name}</li> 새로 생성
- 새로 생성된 nameList로 컴포넌트 생성
- 부모 컴포넌트에 렌더링 하면 오류 생김 -> **key 문제**

# 🎯 key

- **key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용**
- key가 없다면 Vitual DOM을 처음부터 끝까지 비교해야함.

## 1. key 설정

- 규칙 : **key 값은 언제나 유일** ( 게시판이라면 게시판 번호가 key)
- 다음과 같이 수정
  ```
      const nameList = names.map((name, index)=>{
      return <li key={index}>{name}</li>
  })
  ```
- 위 처럼 고유한 값이 없을 때만 index를 key로 설정
  - 초기 상태를 설계할 때 id도 같이 객체로 넣어서 설정

# 🎯 응용

## 1. id를 넣어서 초기 상태 설정하기

- index를 사용하지 않고 key를 만든다.

  ```
  const IterationSample = () => {
      const [names, setNames] = useState([
          {id:1, text:'눈사람'},
          {id:2, text:'얼음'},
          {id:3, text:'눈'},
          {id:4, text:'바람'},
      ])
      const [inputText, setInputText] = useState('');
      const [nextId, setNextId] = useState(5); // 새로운 항목에 추가할 id

      const nameList = names.map(name => {
          return <li key = {name.id}>{name.text}</li>
      })

      return <ul>{nameList}</ul>
  }
  ```

## 2. 데이터 추가 기능 구현

- 이벤트 추가
- **concat으로 불변성** 유지 ( push로 직접적으로 추가 금지 )

  - concat : 새로운 배열을 만들어 상태 변경시 기존 배열의 값을 유지
  - **...(spread)** 연산자로 대체 가능

  ```
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onClick = () => {
  const nextNames = names.concat({
    id: nextId,
    text: inputText,
  });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  };

    /*
    const nextNames = {
        id: nextId,
        text: inputText,
    };
    setNextId(nextId + 1);
    setNames([...nextNames, names]);    // spread 연산자 사용
    setInputText('');
    };

    */
  return (
    <div>
        <input
        value={inputText}
        message="inputText"
        placeholder="값 입력"
        onChange={onChange}
        />
        <button onClick={onClick}>추가</button>
        <ul>{nameList}</ul>;
    </div>
  );
  ```

## 3. 데이터 제거 기능 ( filter() )

- 특정 조건을 만족하는 원소들을 분류
- 분류된 배열 **새로운 배열로 return** -> **불변성 유지**
- filter()

  ```
  const numbers = [1,2,3,4,5,6];
  const biggerThanThree = numbers.filter(number => number > 3);

  // biggerThanThree = [4,5,6]
  ```

- 구현

  - map을 통해 name.id를 key 로 가지고 있는 DOM에 onRemove 함수 설정
  - filter가 불변성 유지가 되기 때문에 concat, spread 쓸 필요 없음.

  ```
  const onRemove = (id) => {
      const nextName = names.filter((name) => name.id !== id);
      setNames(nextName);
  };

  const nameList = names.map((name) => {
      return (
      <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
          {name.text}
      </li>
      );
  });
  ```
