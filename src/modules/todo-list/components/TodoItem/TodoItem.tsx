'use client';

import { FC, useMemo, useState } from 'react';
import { updateTodo } from '../../data/todos';
import TodoItemLoader from './TodoItemLoader';

export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date | null;
}

interface TodoItemProps extends Todo {
  onItemChangeSuccess(id: string, isComplete: boolean): void;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  description,
  isComplete,
  dueDate,
  onItemChangeSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { itemBgStyle, descriptionStyle } = useMemo(() => {
    const dynamicStyles = {
      itemBgStyle: 'bg-gray-100',
      descriptionStyle: '',
    };

    if (isComplete) {
      dynamicStyles.itemBgStyle = 'bg-green-200';
      dynamicStyles.descriptionStyle = 'line-through';
    } else if (dueDate && dueDate < new Date()) {
      dynamicStyles.itemBgStyle = 'bg-red-200';
    }

    return dynamicStyles;
  }, [isComplete, dueDate]);

  const handleItemChangeRequest = () => {
    setIsProcessing(true);

    updateTodo(id, !isComplete).then(({ status }) => {
      if (status === 'success') {
        onItemChangeSuccess(id, !isComplete);
      }

      setIsProcessing(false);
    });
  };

  return (
    <li className={`flex items-center justify-between p-2 ${itemBgStyle}`}>
      <label
        className={`flex gap-3 items-center ${descriptionStyle}`}
        htmlFor={`${id}-isComplete`}
      >
        {!isProcessing ? (
          <input
            className='w-4'
            id={`${id}-isComplete`}
            checked={isComplete}
            onChange={handleItemChangeRequest}
            type='checkbox'
          />
        ) : (
          <TodoItemLoader />
        )}
        {description}
      </label>

      {dueDate && (
        <div className='outline outline-1 outline-black px-2'>
          {dueDate.toLocaleDateString('en-US')}
        </div>
      )}
    </li>
  );
};

export default TodoItem;
