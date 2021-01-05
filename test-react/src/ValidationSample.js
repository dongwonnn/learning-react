import React, { useState } from 'react';
import './ValidationSample.css';

const ValidationSample = () => {
  const [validation, setValidation] = useState({
    password: '',
    clicked: false,
    validated: false,
  });

  const { password, clicked, validated } = validation;

  const onChange = (e) => {
    const nextValidation = {
      ...validation,
      password: e.target.value,
    };
    setValidation(nextValidation);
  };

  const handleButtonClick = () => {
    const nextValidation = {
      ...validation,
      clicked: true,
      validated: password === '0000',
    };
    setValidation(nextValidation);
  };

  return (
    <div>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        className={clicked ? (validated ? 'sucess' : 'failure') : ''}
      />
      <button onClick={handleButtonClick}>검증하기</button>
    </div>
  );
};

export default ValidationSample;
