import TodoList from '@/modules/todo-list/components/TodoList/TodoList';
import { sampleTodos } from '@/modules/todo-list/utilities/todo-list-utils';

export default function Home() {
  return (
    <div>
      <header className='bg-slate-900 p-5 text-white'>
        <h1 className='font-bold'>Todo App</h1>
      </header>
      <main className='flex justify-center p-5'>
        <TodoList todos={sampleTodos} />
      </main>
    </div>
  );
}
