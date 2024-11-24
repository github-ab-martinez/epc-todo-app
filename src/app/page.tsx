import TodoList from '@/modules/todo-list/components/TodoList/TodoList';

export default function TodoApp() {
  return (
    <div>
      {/* TODO: Move header to layout? */}
      <header className='bg-slate-900 p-5 text-white'>
        <h1 className='font-bold'>Todo App</h1>
      </header>
      <main className='flex justify-center p-5'>
        <TodoList />
      </main>
    </div>
  );
}
