## _개념 위주로_ _함수형 컴포넌트로 migration 하기_

# Chapter 07 : 컴포넌트의 라이프사이클 메서드

- 라이프 사이클 : 페이지에 렌더링되기 전인 **준비 과정 ~ 페이지에서 사라질 때** 까지
- 이럴 때..
  - 처음으로 렌더링할때 어떤 작업을 처리해야할 때
  - 업데이트 하기 전, 후에 어떤 작업을 처리해야 할 때
  - 불필요한 업데이트를 방지할 때

# 🎯 라이프사이클 메서드의 이해

- Will 접두사 : 작업하기 전
- Did 접두사 : 작업한 후

## 1. 3가지 카테고리와 각각 카테고리에서 사용되는 메서드

1. **마운트** : DOM이 생성되고 웹 브라우저상에 나타나는 것
   1. constructor : 컴포넌트 새로 만들 때 마다
   2. getDerivedStateFromProps : props값을 state에 넣을 때
   3. render : 준비한 UI 렌더링 할 때
   4. componentDidMount : 컴포넌트가 웹 브라우저에 나타난 후에
2. **업데이트**: 다음과 같은 4가지 경우에

   - props가 바뀔 때 : 부모에서 props가 변해서 자식 컴포넌트에 넘겨줄 때
   - state가 바뀔 때 : 컴포넌트 자신이 가지고 있는 state가 setState에 의해 바뀔 때
   - 부모 컴포넌트가 리렌더링될 때 : 말 그대로..
   - this.forceUpdate가 강제로 렌더링을 트리거 할 때

   1. getDerivedStateFromProps : 마운트 과정에서도 호출. props의 변화에 따라 state값에도 변화를 주고 싶을 때
   2. shouldComponentUpdate : 컴포넌트가 리렌더링을 해야 할지 말아야 할지 결정.
      - true, false 반환.
      - this.forceUpdate() 실행하면 이 과정 건너 뛰고 render() 함수
   3. render : 리렌더링 할 때
   4. getSnapshotBeforeUpdate : 변화를 DOM에 반영하기 직전
   5. componentDidUpdate : 업데이트 작업 끝난 후

3. **언마운트** : 컴포넌트를 DOM에서 제거하는 것
   1. componentWillUnmount : 브라우저에서 컴포넌트가 사라지기 전

# 🎯 라이프사이클 9 메서드 살펴보기

## 1. render

- 컴포넌트 모양새 정의

## 2. constructor

- 생성자 메서드. 초기 state 설정

## 3. getDerivedStateFromProps

- props에서 받아 온 값 state에서 동기화
- nextProps, prevState 인자 2개 사용. 안에 조건문을 통해 동기화 할지 결정

## 4. componentDidMount

- 첫 렌더링을 다 마친 후. 다른 JS파일, 라이브러리, 프레임워크의 함수 호출 등 비동기 작업 수행

## 5. **shouldComponentUpdate**

- props나 state 변경 되었을 때 리렌더링을 할지 안할지 결정
- 현재 props, state => this.props, this.state
- 새로 설정될 props, state => nextProps, nextState
- **업데이트 성능을 개선할 때**

## 6. getSnapshotBeforeUpdate

- render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출
- 이 메서드의 반환값은 componentDidUpdate 메서드의 세번째 인자인 snapshot 전달 ( 스크롤바 위치같은 것 참고할 때)

## 7. componentDidUpdate

- 리렌더링을 완료한 후
- prevPorps, prevState를 이용해 리렌더링 이전의 snapshot 값 전달 받음

## 8. componentWillUnmount

- 컴포넌트에서 DOM을 제거할 때 실행.
- componentDidMount에서 등록한 이벤트, 직접 생성한 DOM 등등.. 여기서 제거

## 9. componentDidCatch

- 에러 발생시 오류 UI 출력

# 🎯 Hooks와 연동

## 1. useEffect

- componentDidMount, componentDidUpdate 메서드 관리

## 2. useEffet의 뒷정리 함수

- componentWillUnmount, getSnapshotBeforeUpdate 메서드 관리
