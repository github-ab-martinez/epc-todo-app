'use client';

import TodoItem, { Todo } from '../TodoItem/TodoItem';
import { compareTodos } from '../../utilities/todo-list-utils';
import { getTodos, updateTodo } from '../../data/todos';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import LoadingOverlay from '@/modules/common/components/LoadingOverlay/LoadingOverlay';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const onItemChangeSuccess = useCallback((id: string, isComplete: boolean) => {
    setTodos(
      (current) =>
        current &&
        current.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isComplete,
            };
          }

          return todo;
        })
    );
  }, []);

  return (
    <div className='sm:w-1/2 w-full'>
      {todos ? (
        <ul className='flex flex-col gap-2'>
          {todos.toSorted(compareTodos).map((todo) => (
            <TodoItem
              key={todo.id}
              onItemChangeSuccess={onItemChangeSuccess}
              {...todo}
            />
          ))}
        </ul>
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
};

export default TodoList;
