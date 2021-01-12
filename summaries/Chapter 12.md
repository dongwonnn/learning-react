# Chapter 12 : Immer 라이브러리 사용하여 불변성 유지

- 깊어지는 전개 연산자 개선

# 🎯 Immer 설치, 개념

- 설치 : yarn add immer
- 핵심 : **불변성에 신경 쓰지 않는 것처럼 코드를 작성하되, 불변성 관리는 제대로 해주는 것**
  - 단순하게 깊은 곳에 위치하는 값을 바꾸는 것 외에도 **배열을 처리**할 때도 쉽다.
    - concat 이나 ...연산자 말고도 push, splice로 관리 가능

# 🎯 사용법

- 얕은 복사 코드

  ```
  import produce from 'immer';

  const App = () => {

      const [form, setForm] = useState('')
      const [data, setData] = useState({
          array: [],
          uselessValue: null
      })

      const onChange = useCallback( e =>{
          setForm(
              produce(form, draft=>{
                  draft[name]=value;
              })
          )
      },
      [form]
      )

  }
  ```

  - **함수 produce : 첫 번째로 수정하고 싶은 상태. 두 번째로 상태를 어떻게 업데이트할지 정의**
  - 위 코드는 얕은 복사해도 상관없음.

- 깊은 복사 코드

  ```
  produce(form, draft=>{
      draft.array.push( ... )
  })

  produce(form, draft=>{
      draft.array.splice(draft.array...)
  })
  ```

  - data 객체 안에 array 배열에 접근하기 위해 immer사용
  - draft.array로 접근 가능하다.
  - push, splice 같은 배열 메서드 바로 사용 가능

# 🎯 useState 함수형 업데이트와 immer 함께 쓰기

- 원래 형태는 produce(form, draft=>{})
- useState와 합친 형태

  - **produce(draft=>{ ... })**
  - **첫 번째 인자인 수정하고 싶은 상태를 생략**
  - 바로 업데이트 함수 반환

- 코드

  ```
  setForm(
      produce(draft=>{
          draft[name] = value;
      })
  )

  setData(
      produce(draft=> {
          draft.array.push(info)
      })
  )
  ```

  - 업데이트 함수와 같은 기능
