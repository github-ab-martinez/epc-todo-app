'use client';

import { ChangeEvent, FC, useMemo } from 'react';
import { updateTodoStatus } from '../../data/todos';

export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date | null;
}

const TodoItem: FC<Todo> = ({ id, description, isComplete, dueDate }) => {
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

  const handleStatusChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const { status } = await updateTodoStatus(id, evt.target.checked);

    console.log(status);
  };

  return (
    <li className={`flex align-middle justify-between p-2 ${itemBgStyle}`}>
      <label
        className={`flex gap-3 align-middle ${descriptionStyle}`}
        htmlFor={`${id}-isComplete`}
      >
        <input
          id={`${id}-isComplete`}
          defaultChecked={isComplete}
          onChange={handleStatusChange}
          type='checkbox'
        />
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
