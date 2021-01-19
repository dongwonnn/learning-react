import React from 'react';
import { connect } from 'react-redux';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';

const { useEffect } = React;
const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  useEffect(() => {
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getPost, getUsers]);

  // useEffect(() => {
  //   getPost(1);
  //   getUsers(1);
  // }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS'],
  }),
  {
    getPost,
    getUsers,
  },
)(SampleContainer);

// function* watchGenerator() {
//   console.log('모니터링 중...')
//   let prevAction = null;
//   while(true){
//       const action = yield
//       console.log('이전 액션', prevAction)
//       prevAction = action;
//       if(action.type === 'HELLO'){
//           console.log('안녕하세요 ! ')
//       }
//   }
// }

// const watch = watchGenerator();
