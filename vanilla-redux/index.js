import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// 1. 액션 이름 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
// const INCREASE = 'INCREASE';
// const DECREASE = 'DECREASE';

// 2. 액션 객체 생성 함수 생성
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
// const increase = (difference) => ({ type: INCREASE, difference });
// const decrease = () => ({ type: DECREASE });

// 3. 초기값 생성
const initialState = {
  toggle: false,
  counter: 0,
};

// const initialState = {
//   toggle: false,
//   counter: 0,
// };

// 4. 리듀서 생성
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case TOGGLE_SWITCH:
//       return {
//         ...state,
//         toggle: !state.toggle,
//       };
//     case INCREASE:
//       return {
//         ...state,
//         counter: state.counter + action.difference,
//       };
//     case DECREASE:
//       return {
//         ...state,
//         counter: state.counter - 1,
//       };
//     default:
//       return state;
//   }
// }

// 5. 스토어 생성
const store = createStore(reducer);
//const store = createStore(reducer);

// 6. 렌더 함수 생성
const render = () => {
  const state = store.getState();

  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }

  counter.innerText = state.counter;
};

render();

// const render = () => {
//   const state = store.getState();
//   if (state.toggle) {
//     divToggle.classList.add('active');
//   } else {
//     divToggle.classList.remove('active');
//   }

//   // 카운터 처리
//   counter.innerText = state.counter;
// };

// render();

// // 7. 구독하기
store.subscribe(render);
// store.subscribe(render);

// // 8. 액션 발생
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

// divToggle.onclick = () => {
//   store.dispatch(toggleSwitch());
// };

// btnIncrease.onclick = () => {
//   store.dispatch(increase(1));
// };

// btnDecrease.onclick = () => {
//   store.dispatch(decrease());
// };
