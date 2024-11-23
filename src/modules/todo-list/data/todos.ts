import { getErrorMessage } from '@/modules/common/utils/exception-handling-utils';
import { Todo } from '../components/TodoItem/TodoItem';

export const getTodos = async (): Promise<Todo[]> => {
  const endpoint = process.env.GET_TODOS_ENDPOINT || '';
  const headerName = process.env.GET_TODOS_HEADER_NAME || '';
  const headerValue = process.env.GET_TODOS_HEADER_VALUE || '';

  try {
    const response = await fetch(endpoint, {
      headers: {
        [headerName]: headerValue,
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to fetch todos: ${response.status}`);
    }

    const todos: Todo[] = await response.json();

    return todos.map((todo) => ({
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
    }));
  } catch (error) {
    console.error(getErrorMessage(error));

    // TODO: Handle empty state rendering
    return [];
  }
};
