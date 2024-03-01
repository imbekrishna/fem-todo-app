import { TodoItem } from '../helpers/types';
import crossIcon from '../assets/images/icon-cross.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Checkbox from './Checkbox';
import { memo } from 'react';

type ListItemProp = {
  id: string;
  todo: TodoItem;
  activeTab: string;
  handleDone: (id: string) => void;
  handleRemove: (id: string) => void;
};

function ListItem({
  id,
  todo,
  activeTab,
  handleDone,
  handleRemove,
}: ListItemProp) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`
      itemStyle 
      ${todo.done ? 'itemDone' : 'itemPending'}
      ${activeTab}
      `}
      {...attributes}
      {...listeners}
    >
      <Checkbox checked={todo.done} onChange={() => handleDone(todo.id)} />
      <p>{todo.body}</p>
      <img
        src={crossIcon}
        alt="close button"
        role="button"
        className="asButton hideOnDesktop"
        onClick={() => handleRemove(todo.id)}
      />
    </li>
  );
}

const MemoListItem = memo(ListItem);
export default MemoListItem;
