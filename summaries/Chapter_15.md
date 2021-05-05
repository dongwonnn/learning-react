# Chapter 15 : Context API

- 전역적으로 사용할 정보들
  - 로그인 정보, 애플리케이션 환경 설정, 테마..

# 🎯 Context API를 사용한 전역 상태 관리 흐름 이해하기

- 일반적으로는 최상위 컴포넌트인 App의 state에 넣어서 관리한다.
  - 이럴 경우 컴포넌트가 깊어질수록 구조가 복잡, 유지 보수성 낮아진다.
- Context API를 사용하면 Context를 만들어 단 한 번에 원하는 값을 받아와 사용 가능.

# 🎯 Context API 사용법

## 1. context만들기

- react의 **createContext 함수**를 사용
- contexts 폴더 만들어서 관리.
- contexts/color.js

```
import {createContext} from 'react';

const ColorContext = createContext({ color: 'black'});

export default ColorContext;
```

## 2. Consumer 컴포넌트 : 조회

- **Consumer** : state를 props로 받는 것이 아닌 Consumer 컴포넌트를 통해 조회

  - Consumer 사이에 중괄호를 열어 **함수**전달. children이 아닌 **함수를 전달한다.**
  - 직접 변수를 사용하는 곳에 사용
  - 파라미터인 value는 ColorContext의 값

    ```
    import ColorContext from '../contexts/color'
    const ColorBox = () => {
    return (
            {value => (
                background: value.color // black
            )}
        )
    }
    ```

## 3. Provider 컴포넌트 : 값 변경

- **Provider** : context의 value를 변경할 수 있다.
  ```
  return (
      <ColorContext.Provider value={{color : 'red'}}>
          <div>
              <ColorBox />
          </div>
      </ColorContext.Provider>
  )
  ```
  - Provider를 사용하는데 value를 사용하지 않는다면 오류가 생긴다. 기본값이기 때문에.

# 🎯 동적 Context 사용하기. ( Context 업데이트하기 )

## 1. Context는 상태 값과 함수가 존재

- context 수정

  ```
  const ColorContext = createContext({
      state : { color : 'black', subcolor : 'red'}
      actions : {
          setColor: ()=> {},
          setSubcolor: () => {}
      }
  })

  const ColorProvider = ({children}) => {
      const [color, setColor] = useState('black')
      const [red, setRed] = useState('red')

      const value = {
          state: {color, subcolor},
          actions : {setColor, setSubcolor}
      };
      return (
          // 이렇게 하면서 ColorContext.Provider 대신 ColorProvider로 사용 가능
          <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
      )
  }

  // const ColorConsumer = ColorContext.Consumer
  // Consumer 쓸 때 ColorContext.Consumer를 colorConsumer로 대체 가능하다.
  const { Consumer: ColorConsumer } = ColorContext;

  // ColorProvider는 ColorContext.Provider를 반환하면서 ,
  // ColorConsumer는 const { Consumer: ColorConsumer } = ColorContext;를 통해서 사용 가능
  export {ColorProvider, ColorConsumer} ;

  export default ColorContext;
  ```

  - state와 action 분리해서 작성. context도 Provider의 value에 넣는 객체의 형태와 일치시켜주는 것이 좋다.

## 2. 새로운 Context 반영하기

- App.js에 ColorProvider, ColorBox.js에서 ColorConsumer로 교체
- ColorBox.js

  ```
  return (
      {value => (
          <>
              <div
                  background : value.state.color
              />
              <div
                  background : value.state.subcolor
              />
          <>
      )}
  )
  ```

  - 비구조화 할당 문법으로 value 대신 {state}, value.color, value.subcolor 가능

## 3. 함수 호출해 context 변화주기

- SelectColor.js 파일 생성

  ```
  const colors = ['red', 'orange', 'yellow', 'green']

  <ColorConsumer>
      {({actions}) => (
          {colors.map(color => (
              <div
                  key={color}
                  onClick={()=>actions.setColor(color)}
                  onContextMenu= {e =>
                  e.preventDefault();
                  actions.setSubcolor(color)}
              >
          ))}
      )}
  </ColorConsumer>
  ```

  - **consumer로 상태와 함수를 가져온다.**
  - actions 객체를 받아오고, 각 함수들 사용

## 4. useContext Hook 쓰기

- ColorConsumer 대신 useContext 사용

```
// const {state} = value; === state => value.state
<ColorConsumer>
    {({state}) => ( ... )}
</ColorConsumer>

// {state } = value.state
const { state } = useContext(ColorContext)
```
