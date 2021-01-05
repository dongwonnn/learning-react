import React, { forwardRef, useRef } from 'react';
import ScrollBox from './ScrollBox';

const App = () => {
  const scrollBox = React.createRef();

  return (
    <div>
      <ScrollBox ref={scrollBox} />
      <button onClick={() => scrollBox.scrollToBottom()}>맨 밑으로</button>
    </div>
  );
};

export default App;
