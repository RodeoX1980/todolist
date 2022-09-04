import { createStore } from 'solid-js/store';
import { ulid } from 'ulid';

export type Todo = {
  id: string;
  description: string;
  tags: Set<string>;
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
      { id: ulid(), description: text, isCompleted: false, tags: new Set<string>() },
    ]);
  };

  const removeTodo = (id: string) => {
    setState("todos", (todos) => [...todos.filter((todo) => todo.id !== id)]);
  };

  const toggleTodo = (id: string) => {
    setState(
      "todos",
      (todo) => todo.id === id,
      "isCompleted",
      (completed) => !completed
    );
  };

  const addTag = (id: string, tagName: string) => {
    setState("todos", (todo) => todo.id === id, "tags", (tags) => tags.add(tagName));
  }

  const removeTag = (id: string, tagName: string) => {
    setState("todos", (todo) => todo.id === id, "tags", (tags) => {
      if (tags.has(tagName)) {
        tags.delete(tagName);
      }
      return tags;
    });
  }

  return {
    state,
    addTodo,
    removeTodo,
    toggleTodo,
    addTag,
    removeTag
  }
}
