import React, { useState } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5); // 새로운 항목에 추가할 id

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onClick = () => {
    const nextName = {
      id: nextId,
      text: inputText,
    };
    setNextId(nextId + 1);
    setNames([...names, nextName]);
    console.log(names);
    setInputText('');
  };

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
};

export default IterationSample;
