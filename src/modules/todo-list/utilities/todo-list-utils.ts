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
