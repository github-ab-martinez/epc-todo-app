import { FC } from 'react';

export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date | null;
}

const TodoItem: FC<Todo> = ({ description, isComplete, dueDate }) => {
  return (
    <li>
      {description} isComplete: {isComplete ? 'complete' : 'incomplete'},
      dueDate: {dueDate?.toString()}
    </li>
  );
};

export default TodoItem;
