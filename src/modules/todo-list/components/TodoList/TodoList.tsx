'use client';

import TodoItem, { Todo } from '../TodoItem/TodoItem';
import { compareTodos } from '../../utilities/todo-list-utils';
import { getTodos, updateTodoStatus } from '../../data/todos';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '@/modules/common/components/LoadingSpinner/LoadingSpinner';

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

      updateTodoStatus(id, evt.target.checked).then(({ status }) => {
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
    <div className='relative sm:w-1/2 w-full min-h-36'>
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
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default TodoList;
