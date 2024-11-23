import TodoItem from '../TodoItem/TodoItem';
import { compareTodos } from '../../utilities/todo-list-utils';
import { getTodos } from '../../data/todos';

async function TodoList(): Promise<JSX.Element> {
  const todos = await getTodos();

  return (
    <ul className='flex flex-col w-1/2 gap-2'>
      {todos.toSorted(compareTodos).map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

export default TodoList;
