import React, { useCallback, useRef, useState } from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';
import TodoTemplate from './Components/TodoTemplate';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: '1',
      text: '리액트 기초를 배우자',
      checked: true,
    },
    {
      id: '2',
      text: '3번째 안보고 하기',
      checked: false,
    },
    {
      id: '3',
      text: '최적화 해보기',
      checked: true,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const nextTodo = {
        id: nextId.current,
        text,
        checked: false,
      };

      setTodos([...todos, nextTodo]);
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(
        todos.filter((todo) => {
          return todo.id !== id;
        }),
      );
    },
    [todos],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
        }),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
