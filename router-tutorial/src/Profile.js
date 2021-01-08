import React from 'react';
import { withRouter } from 'react-router-dom';
import WithRouterSample from './WithRouterSample';

const data = {
  velopert: {
    name: '김민준',
    description: '리액트를 좋아하는 개발자',
  },
  gildong: {
    name: '고길동',
    description: '둘리 아빠',
  },
};

const Profile = ({ match }) => {
  const { username } = match.params; // username은 App.js Link 컴포넌트에서 받은 props값
  const profile = data[username]; // data[velopert] 혹은 data[gildong]
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default withRouter(Profile);
