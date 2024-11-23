import { Todo } from '../components/TodoItem/TodoItem';

const currentDate = new Date();

export const compareTodos = (a: Todo, b: Todo) => {
  // Sort by completed
  if (a.isComplete && !b.isComplete) return 1;
  if (b.isComplete && !a.isComplete) return -1;

  // Sort by overdue
  const aOverdue = a.dueDate && a.dueDate < currentDate;
  const bOverdue = b.dueDate && b.dueDate < currentDate;

  if (aOverdue && !bOverdue) return -1;
  if (bOverdue && !aOverdue) return 1;

  // Sort by due date
  if (!b.dueDate) return -1;
  if (a.dueDate && b.dueDate && a.dueDate < b.dueDate) return -1;
  if (a.dueDate && b.dueDate && a.dueDate > b.dueDate) return 1;

  return 0;
};

// TODO: Remove once server implementation is complete
export const sampleTodos = [
  {
    id: '1',
    description: 'File 2023 Taxes',
    isComplete: true,
    dueDate: new Date('2023-03-10T17:50:44.673Z'),
  },
  {
    id: '2',
    description: 'Fold laundry',
    isComplete: true,
    dueDate: null,
  },
  {
    id: '3',
    description: 'Call Mom',
    isComplete: false,
    dueDate: new Date('2023-06-26T19:00:00.000Z'),
  },
  {
    id: '4',
    description: 'Walk the dog',
    isComplete: false,
    dueDate: null,
  },
  {
    id: '5',
    description: 'Feed the cat',
    isComplete: false,
    dueDate: new Date('2025-03-24T15:45:00.000Z'),
  },
  {
    id: '6',
    description: 'Run LA marathon',
    isComplete: false,
    dueDate: new Date('2023-03-21T13:30:00.000Z'),
  },
];
