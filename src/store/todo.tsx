import { createStore } from 'solid-js/store';
import { ulid } from 'ulid';

export type Todo = {
  id: string;
  description: string;
  tags: string[];
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
      { id: ulid(), description: text, isCompleted: false, tags: [] },
    ]);
    console.log("add todo:", state.todos);
  };

  const removeTodo = (id: string) => {
    setState("todos", (todos) => [...todos.filter((todo) => todo.id !== id)]);
  };

  const toggleTodo = (id: string) => {
    setState("todos", (todo) => todo.id === id,
      "isCompleted", (completed) => !completed,
    );
  };

  const addTag = (id: string, tagName: string) => {
    setState("todos", (todo) => todo.id === id, "tags",
      (tags) => {
        if (!tags.includes(tagName)) {
          tags.push(tagName);
        }
        return tags;
      });
    console.log(state.todos);
  }

  const removeTag = (id: string, tagName: string) => {
    setState("todos", (todo) => todo.id === id, "tags", (tags) => tags.filter((tag) => tag !== tagName));
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
