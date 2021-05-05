import React, { useRef } from 'react';

const ScrollBox = () => {
  const style = {
    border: '1px solid black',
    height: '300px',
    width: '300px',
    overflow: 'auto',
    position: 'relative',
  };

  const innerStyle = {
    width: '100%',
    height: '650px',
    background: 'linear-gradient(white, black)',
  };

  const box = useRef(null);

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = box;
    // box.scrollHeight
    // box.client.Height
    // 여기서 box는 style={style}인 div DOM
    // 얘들 값은 스크롤바 생기면 자동으로 만들어주는 것들임

    box.scrollTop = scrollHeight - clientHeight;
  };

  return (
    <div style={style} ref={box}>
      <div style={innerStyle}></div>
    </div>
  );
};

export default ScrollBox;
