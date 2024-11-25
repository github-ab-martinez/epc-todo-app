import { Todo } from '../components/TodoItem/TodoItem';

export const compareTodos = (a: Todo, b: Todo) => {
  // Sort by completed
  if (a.isComplete !== b.isComplete) {
    return a.isComplete ? 1 : -1;
  }

  if (a.dueDate && b.dueDate) {
    // Sort by overdue
    const currentDate = new Date();
    const aOverdue = a.dueDate && a.dueDate < currentDate;
    const bOverdue = b.dueDate && b.dueDate < currentDate;

    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }

    // Sort by due date
    if (a.dueDate !== b.dueDate) {
      return a.dueDate < b.dueDate ? -1 : 1;
    }
  }

  if (!b.dueDate) {
    return -1;
  }

  return 0;
};
