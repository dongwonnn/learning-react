import React, { useState } from 'react';
import Info from './Info';

const App = () => {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={onClick}>{visible ? '보이기' : '숨기기'}</button>
      <hr />
      {visible && <Info />}
    </div>
  );
};

export default App;
