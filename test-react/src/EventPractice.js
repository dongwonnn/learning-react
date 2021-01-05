import React, { useState } from 'react';

const EventPractice = () => {
  const [form, setForm] = useState({
    message: '',
    username: '',
  });

  const { message, username } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(`${username}과 ${message}`);
    setForm({
      message: '',
      username: '',
    });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="사용자명"
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        value={message}
        placeholder="아무거나 입력해보세요."
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
