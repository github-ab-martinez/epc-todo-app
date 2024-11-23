import LoadingSpinner from '@/modules/common/components/LoadingSpinner/LoadingSpinner';
import TodoList from '@/modules/todo-list/components/TodoList/TodoList';
import { Suspense } from 'react';

export default function TodoApp() {
  return (
    <div>
      {/* TODO: Move header to layout? */}
      <header className='bg-slate-900 p-5 text-white'>
        <h1 className='font-bold'>Todo App</h1>
      </header>
      <main className='flex justify-center p-5'>
        <Suspense fallback={<LoadingSpinner />}>
          <TodoList />
        </Suspense>
      </main>
    </div>
  );
}
