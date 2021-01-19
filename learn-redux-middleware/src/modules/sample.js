import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api';
// api 객체 형태로 가져오기
//import createRequestThunk from '../lib/createRequestThunk';

import createRequestSaga from '../lib/createRequestSaga';
import { call, put, takeLatest } from 'redux-saga/effects';
// import { startLoading, finishLoading } from './loading';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수 생성
// 시작, 성공, 실패했을 때 다른 액션을 디스패치
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST));

//   try {
//     const post = yield call(api.getPost, action.payload);
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_POST));
// }

// function* getUsersSaga(action) {
//   yield put(startLoading(GET_USERS));

//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// ---------------------------------------------------------------------

// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST }); // 시작
//   try {
//     // 성공
//     const response = await api.getPost(id);
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data,
//     });
//   } catch (e) {
//     // 실패
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     });
//     throw e; //에러 조회
//   }
// };

// export const getUsers = (id) => async (dispatch) => {
//   dispatch({ type: GET_USERS });
//   try {
//     const response = await api.getUsers();
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (e) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     });
//     throw e;
//   }
// };

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState,
);

export default sample;

// const initialState = {
//   loading: {
//     GET_POST: false,
//     GET_USERS: false,
//   },
//   post: null,
//   users: null,
// };

// const sample = handleActions(
//   {
//     [GET_POST]: (state) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_POST: true,
//       },
//     }),
//     [GET_POST_SUCCESS]: (state, action) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_POST: false,
//       },
//       post: action.payload,
//     }),
//     [GET_POST_FAILURE]: (state, action) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_POST: false,
//       },
//     }),
//     [GET_USERS]: (state) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_USER: true,
//       },
//     }),
//     [GET_USERS_SUCCESS]: (state, action) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_USER: false,
//       },
//       users: action.payload,
//     }),
//     [GET_USERS_FAILURE]: (state, action) => ({
//       ...state,
//       loading: {
//         ...state.loading,
//         GET_USER: false,
//       },
//     }),
//   },
//   initialState,
// );

//export default sample;
