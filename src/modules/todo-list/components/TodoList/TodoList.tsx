import { FC } from 'react';
import TodoItem, { Todo } from '../TodoItem/TodoItem';
import { compareTodos } from '../../utilities/todo-list-utils';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className='flex flex-col w-1/2 gap-2'>
      {todos?.toSorted(compareTodos).map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
