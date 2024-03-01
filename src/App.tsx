import darkIcon from './assets/images/icon-moon.svg';
import lightIcon from './assets/images/icon-sun.svg';

import React, { useEffect, useState } from 'react';
import FilterList from './components/FilterList';
import ListItem from './components/ListItem';
import { getAllTodos, saveToLS } from './helpers/ls_helper';
import { TodoItem } from './helpers/types';
import NewTodo from './components/NewTodo';
import DnDWrapper from './components/DnDWrapper';

const App = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useState(defaultDark);

  useEffect(() => {
    document.body.classList.toggle('dark');
  }, [isDark]);

  const [todoItems, setTodoItems] = useState<TodoItem[]>(() => getAllTodos());

  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    saveToLS(todoItems);
  }, [todoItems]);

  const unfinished = todoItems.filter((todo) => todo.done === false);
  const notDoneCount = unfinished.length;

  const createNew = (newTodo: TodoItem) => {
    setTodoItems((prev) => [...prev, newTodo]);
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
      id={todo.id}
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

      <NewTodo createNew={createNew} />

      <ul className="todoItems shadow">
        <DnDWrapper todoItems={todoItems} setTodoItems={setTodoItems}>
          {todoElements}
        </DnDWrapper>
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
