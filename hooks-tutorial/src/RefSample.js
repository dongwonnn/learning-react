import React, { useRef } from 'react';

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };

  return <div>RefSample</div>;
};

export default RefSample;
