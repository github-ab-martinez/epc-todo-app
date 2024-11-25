'use client';

import TodoItem, { Todo } from '../TodoItem/TodoItem';
import { compareTodos } from '../../utilities/todo-list-utils';
import { getTodos, updateTodo } from '../../data/todos';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import LoadingOverlay from '@/modules/common/components/LoadingOverlay/LoadingOverlay';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
      setIsLoading(false);
    });
  }, []);

  const itemChangeHandler = useCallback(
    (evt: ChangeEvent<HTMLInputElement>, id: string) => {
      setIsLoading(true);

      updateTodo(id, evt.target.checked).then(({ status }) => {
        if (status === 'success') {
          setTodos((current) =>
            current?.map((todo) => {
              if (todo.id === id) {
                return {
                  ...todo,
                  isComplete: evt.target.checked,
                };
              }

              return todo;
            })
          );
        }

        setIsLoading(false);
      });
    },
    []
  );

  return (
    <div className='sm:w-1/2 w-full'>
      {todos && (
        <ul className='flex flex-col gap-2'>
          {todos.toSorted(compareTodos).map((todo) => (
            <TodoItem
              key={todo.id}
              onItemChange={itemChangeHandler}
              {...todo}
            />
          ))}
        </ul>
      )}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default TodoList;
