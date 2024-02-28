import { TodoItem } from './types';

const LS_KEY = 'fem-todos';

export const defaultTodos: TodoItem[] = [
  {
    id: 'zGLrQpHqCaRk8a9M',
    body: 'Complete online javascript course',
    done: true,
  },
  {
    id: 'zGLrQpHqCaRk8a3r',
    body: 'Jog around the partk 3x',
    done: false,
  },
  {
    id: 'zGLrQpdfCaRk8a9M',
    body: '10 minutes meditation',
    done: false,
  },
  {
    id: 'zGLrQpHqCkxk8a9M',
    body: 'Read for 1 hour',
    done: false,
  },
  {
    id: 'zGLrQpHqCaRk8a4M',
    body: 'Pick up groceries',
    done: false,
  },
  {
    id: 'zGLrQpHqCaRl8a9M',
    body: 'Complete Todo App on Frontend Mentor',
    done: false,
  },
];

export function saveToLS(items: TodoItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function getAllTodos(): TodoItem[] {
  const dataString = localStorage.getItem(LS_KEY);
  if (!dataString) {
    saveToLS(defaultTodos);
    return defaultTodos;
  }
  return JSON.parse(dataString);
}
