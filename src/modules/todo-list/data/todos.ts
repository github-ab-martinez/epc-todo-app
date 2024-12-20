'use server';

import { getErrorMessage } from '@/modules/common/utils/exception-handling-utils';
import { Todo } from '../components/TodoItem/TodoItem';

const EPC_API_URL = process.env.EPC_API_URL || '';
const EPC_API_KEY_NAME = process.env.EPC_API_KEY_NAME || '';
const EPC_API_KEY_VALUE = process.env.EPC_API_KEY_VALUE || '';

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${EPC_API_URL}/get`, {
      headers: {
        [EPC_API_KEY_NAME]: EPC_API_KEY_VALUE,
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

    return [];
  }
};

export const updateTodo = async (
  id: string,
  isComplete: boolean
): Promise<{ status: string }> => {
  try {
    const response = await fetch(`${EPC_API_URL}/patch/${id}`, {
      body: JSON.stringify({
        isComplete,
      }),
      headers: {
        [EPC_API_KEY_NAME]: EPC_API_KEY_VALUE,
      },
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Unable to update todo: ${response.status}`);
    }

    const status: { status: string } = await response.json();

    return status;
  } catch (error) {
    console.error(getErrorMessage(error));

    return { status: 'error' };
  }
};
