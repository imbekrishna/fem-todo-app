import darkIcon from './assets/images/icon-moon.svg';
import crossIcon from './assets/images/icon-cross.svg';
import React, { useEffect, useRef, useState } from 'react';
import { TodoItem } from './helpers/types';
import { getAllTodos, saveToLS } from './helpers/ls_helper';
import { nanoid } from 'nanoid';

const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(() => getAllTodos());

  const [newTodo, setNewTodo] = useState<TodoItem>({
    id: '',
    body: '',
    done: false,
  });

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    saveToLS(todoItems);
  }, [todoItems]);

  const inputRef = useRef<HTMLInputElement>(null);

  const unfinished = todoItems.filter((todo) => todo.done === false);
  const notDoneCount = unfinished.length;

  const createNew = (e: React.FormEvent) => {
    e.preventDefault();
    const id = nanoid();

    setTodoItems((prev) => [...prev, { ...newTodo, id }]);
    inputRef.current?.blur();

    setNewTodo({
      id,
      body: '',
      done: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setNewTodo((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleDone = (id: string) => {
    const updated = todoItems.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodoItems(updated);
  };

  const handleClearCompleted = () => {
    setTodoItems(unfinished);
  };

  const handleRemove = (id: string) => {
    const items = [...todoItems];
    const itemIndex = items.findIndex((item) => item.id === id);
    items.splice(itemIndex, 1);
    setTodoItems(items);
  };

  const setFilter = (e: React.MouseEvent) => {
    const filter = (e.target as HTMLSpanElement).id;
    setActiveTab(filter);
  };

  const todoElements = todoItems.map((todo) => (
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
  ));

  return (
    <main>
      <header>
        <h1>TODO</h1>
        <img src={darkIcon} alt="" />
      </header>

      <form className="itemStyle" onSubmit={createNew}>
        <input
          type="checkbox"
          name="done"
          checked={newTodo?.done}
          onChange={handleChange}
        />
        <input
          ref={inputRef}
          type="text"
          name="body"
          value={newTodo?.body}
          onChange={handleChange}
          placeholder="Create a new todo..."
        />
      </form>

      <ul className="todoItems shadow">
        {todoElements}
        <div className="itemStyle status">
          <span>{notDoneCount} items left</span>
          {newFunction(setFilter, activeTab, ['hideOnMobile'])}
          <span
            className="asButton"
            role="button"
            onClick={handleClearCompleted}
          >
            Clear completed
          </span>
        </div>
      </ul>

      {newFunction(setFilter, activeTab, ['hideOnDesktop', 'itemStyle'])}

      <footer>Drag and drop to reorder list</footer>
    </main>
  );
};
function newFunction(
  setFilter: (e: React.MouseEvent) => void,
  activeTab: string,
  classList?: string[]
) {
  return (
    <div className={`filter ${classList?.join(' ')}`} onClick={setFilter}>
      <span
        role="button"
        className={`asButton ${activeTab === 'all' ? 'active' : ''}`}
        id="all"
      >
        All
      </span>
      <span
        role="button"
        className={`asButton ${activeTab === 'active' ? 'active' : ''}`}
        id="active"
      >
        Active
      </span>
      <span
        role="button"
        className={`asButton ${activeTab === 'completed' ? 'active' : ''}`}
        id="completed"
      >
        Completed
      </span>
    </div>
  );
}

export default App;
