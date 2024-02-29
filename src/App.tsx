import darkIcon from './assets/images/icon-moon.svg';
import lightIcon from './assets/images/icon-sun.svg';

import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import FilterList from './components/FilterList';
import ListItem from './components/ListItem';
import { getAllTodos, saveToLS } from './helpers/ls_helper';
import { TodoItem } from './helpers/types';

// React DND kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const App = () => {
  // #region DNDKit

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // #endregion

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
      id={todo.id}
      key={todo.id}
      todo={todo}
      activeTab={activeTab}
      handleDone={handleDone}
      handleRemove={handleRemove}
    />
  ));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setTodoItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todoItems}
            strategy={verticalListSortingStrategy}
          >
            {todoElements}
          </SortableContext>
        </DndContext>
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
