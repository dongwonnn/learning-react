import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다dd.
      </p>
      <button onClick={() => setValue(value + 3)}>+2</button>
      <button onClick={() => setValue(value - 2)}>-2</button>
    </div>
  );
};

export default Counter;
