import darkIcon from './assets/images/icon-moon.svg';
import lightIcon from './assets/images/icon-sun.svg';

import React, { useEffect, useRef, useState } from 'react';
import { TodoItem } from './helpers/types';
import { getAllTodos, saveToLS } from './helpers/ls_helper';
import { nanoid } from 'nanoid';
import FilterList from './components/FilterList';
import ListItem from './components/ListItem';

const App = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useState(defaultDark);

  useEffect(() => {
    document.body.classList.toggle('dark');
  }, [isDark]);

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
    <ListItem
      key={todo.id}
      todo={todo}
      activeTab={activeTab}
      handleDone={handleDone}
      handleRemove={handleRemove}
    />
  ));

  return (
    <main>
      <header>
        <h1>TODO</h1>
        <img
          src={isDark ? darkIcon : lightIcon}
          alt=""
          role="button"
          onClick={() => setIsDark((prev) => !prev)}
        />
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
          <FilterList
            setFilter={setFilter}
            activeTab={activeTab}
            classList={['hideOnMobile']}
          />
          <span
            className="asButton"
            role="button"
            onClick={handleClearCompleted}
          >
            Clear completed
          </span>
        </div>
      </ul>

      <FilterList
        setFilter={setFilter}
        activeTab={activeTab}
        classList={['hideOnDesktop', 'itemStyle']}
      />

      <footer>Drag and drop to reorder list</footer>
    </main>
  );
};

export default App;
