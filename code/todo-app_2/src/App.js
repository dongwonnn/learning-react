import React, { useCallback, useReducer, useRef } from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';
import TodoTemplate from './Components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return [...todos, action.nextTodo];
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  //const [todos, setTodos] = useState(createBulkTodos);

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const nextTodo = {
      id: nextId.current,
      text,
      checked: false,
    };

    //setTodos([...todos, nextTodo]);
    // setTodos((todos) => {
    //   return [...todos, nextTodo];
    // });

    dispatch({ type: 'INSERT', nextTodo });

    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    // setTodos((todos) =>
    //   todos.filter((todo) => {
    //     return todo.id !== id;
    //   }),
    // );

    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
