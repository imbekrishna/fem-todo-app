import lightIcon from './assets/images/icon-sun.svg';
import darkIcon from './assets/images/icon-moon.svg';
import crossIcon from './assets/images/icon-cross.svg';

const todoItems = [
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
];

const App = () => {
  const todoElements = todoItems.map((todo) => (
    <li className="itemStyle" key={todo.id}>
      <input type="checkbox" id="" />
      <p>{todo.body}</p>
      <img src={crossIcon} alt="close button" />
    </li>
  ));

  return (
    <main>
      <header>
        <h1>TODO</h1>
        <img src={darkIcon} alt="" />
      </header>

      <form className="itemStyle">
        <input type="checkbox" />
        <input type="text" placeholder="Create a new todo..." />
        {/* TODO: Remove inline style */}
      </form>

      <ul className="todoItems shadow">
        {todoElements}
        <div className="itemStyle status">
          <span>5 items left</span> <span>Clear completed</span>
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
