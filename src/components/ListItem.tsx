import { TodoItem } from '../helpers/types';
import crossIcon from '../assets/images/icon-cross.svg';

type ListItemProp = {
  todo: TodoItem;
  activeTab: string;
  handleDone: (id: string) => void;
  handleRemove: (id: string) => void;
};

function ListItem({ todo, activeTab, handleDone, handleRemove }: ListItemProp) {
  return (
    <li
      className={`
      itemStyle 
      ${todo.done ? 'itemDone' : 'itemPending'}
      ${activeTab}
      `}
      key={todo.id}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => handleDone(todo.id)}
      />
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

export default ListItem;
