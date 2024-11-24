'use client';

import { ChangeEvent, FC, useMemo } from 'react';

export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: Date | null;
}

interface TodoItemProps extends Todo {
  onItemChange(evt: ChangeEvent<HTMLInputElement>, id: string): void;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  description,
  isComplete,
  dueDate,
  onItemChange,
}) => {
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

  return (
    <li className={`flex align-middle justify-between p-2 ${itemBgStyle}`}>
      <label
        className={`flex gap-3 align-middle ${descriptionStyle}`}
        htmlFor={`${id}-isComplete`}
      >
        <input
          id={`${id}-isComplete`}
          defaultChecked={isComplete}
          onChange={(evt) => onItemChange(evt, id)}
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
