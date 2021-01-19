import logo from './logo.svg';
import './App.css';
import React, { Suspense, useState } from 'react';
import lodable from '@loadable/component';

const SplitMe = lodable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>,
});

function App() {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    console.log('1');
    SplitMe.preload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
