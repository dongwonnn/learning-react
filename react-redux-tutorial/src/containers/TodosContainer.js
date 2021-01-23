import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import { useSelector, useDispatch } from 'react-redux';

const TodoContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback((input) => dispatch(changeInput(input)), [
    dispatch,
  ]);
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default TodoContainer;

// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

export default connect(
  // const { todo } = state;
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  // (state) => ({
  //   input: state.todos.input,
  //   todos: state.todos.todos,
  // }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  },
)(TodosContainer);
