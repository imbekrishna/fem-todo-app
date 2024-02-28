import darkIcon from './assets/images/icon-moon.svg';
import crossIcon from './assets/images/icon-cross.svg';
import React, { useRef, useState } from 'react';

type TodoItem = {
  id: number | null;
  body: string;
  done: boolean;
};

const App = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: 1,
      body: 'Complete online javascript course',
      done: true,
    },
    {
      id: 2,
      body: 'Jog around the partk 3x',
      done: false,
    },
    {
      id: 3,
      body: '10 minutes meditation',
      done: false,
    },
    {
      id: 4,
      body: 'Read for 1 hour',
      done: false,
    },
    {
      id: 5,
      body: 'Pick up groceries',
      done: false,
    },
    {
      id: 6,
      body: 'Complete Todo App on Frontend Mentor',
      done: false,
    },
  ]);

  const [newTodo, setNewTodo] = useState<TodoItem>({
    id: null,
    body: '',
    done: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const unfinished = todoItems.filter((todo) => todo.done === false);
  const notDoneCount = unfinished.length;

  const createNew = (e: React.FormEvent) => {
    e.preventDefault();
    setNewTodo((prev) => ({ ...prev, id: todoItems.length + 1 }));
    setTodoItems((prev) => [...prev, newTodo]);

    setNewTodo({
      id: null,
      body: '',
      done: false,
    });

    inputRef.current?.blur();
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

  const markAsDone = (id: number) => {
    const updatedItems = todoItems.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );

    setTodoItems(updatedItems);
  };

  const clearCompleted = () => {
    setTodoItems(unfinished);
  };

  const todoElements = todoItems.map((todo) => (
    <li className="itemStyle" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => markAsDone(todo.id)}
      />
      <p className={`${todo.done && 'itemDone'}`}>{todo.body}</p>
      <img src={crossIcon} alt="close button" />
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
          <span>{notDoneCount} items left</span>{' '}
          <span className="clearButton" role="button" onClick={clearCompleted}>
            Clear completed
          </span>
        </div>
      </ul>

      <div className="itemStyle filter">
        <span>All</span>
        <span>Active</span>
        <span>Completed</span>
      </div>

      <footer>Drag and drop to reorder list</footer>
    </main>
  );
};
export default App;
