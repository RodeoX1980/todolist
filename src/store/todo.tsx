import { createStore } from 'solid-js/store';
import { ulid } from 'ulid';

export type Todo = {
  id: string;
  description: string;
  isCompleted: boolean;
}

type Store = {
  todos: Todo[];
}

const initialValue: Store = { todos: [] };

export const useTodo = () => {
  const [state, setState] = createStore(initialValue);

  const addTodo = (text: string) => {
    setState("todos", (todos) => [
      ...todos,
      { id: ulid(), description: text, isCompleted: false },
    ]);
  };

  const removeTodo = (id: string) => {
    setState("todos", (todos) => [...todos.filter((todo) => todo.id !== id)]);
  }

  const toggleTodo = (id: string) => {
    setState(
      "todos",
      (todo) => todo.id === id,
      "isCompleted",
      (completed) => !completed
    )
  }

  return {
    state,
    addTodo,
    removeTodo,
    toggleTodo
  }
}
