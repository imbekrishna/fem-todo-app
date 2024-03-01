import { useRef, useState } from 'react';
import { TodoItem } from '../helpers/types';
import Checkbox from './Checkbox';
import { nanoid } from 'nanoid';

type NewTodoProps = {
  createNew: (item: TodoItem) => void;
};

const NewTodo = ({ createNew }: NewTodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTodo, setNewTodo] = useState<TodoItem>({
    id: '',
    body: '',
    done: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setNewTodo((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleCheck = (value: boolean) => {
    setNewTodo((prev) => {
      return {
        ...prev,
        done: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = nanoid();

    createNew({ ...newTodo, id });
    inputRef.current?.blur();

    setNewTodo({
      id,
      body: '',
      done: false,
    });
  };

  return (
    <form className="itemStyle" onSubmit={handleSubmit}>
      <Checkbox checked={newTodo?.done} onChange={handleCheck} />
      <input
        ref={inputRef}
        type="text"
        name="body"
        value={newTodo?.body}
        onChange={handleChange}
        placeholder="Create a new todo..."
      />
    </form>
  );
};
export default NewTodo;
