import React from 'react';
import WithRouterSample from './WithRouterSample';

const data = {
  velopert: {
    name: '김민준',
    description: '리액트 저자',
  },
  dongwon: {
    name: '김동원',
    description: '공부 중',
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div> 존재하지 않는 사용자입니다.</div>;
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

export default Profile;
