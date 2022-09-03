import { Todo } from "@/store/todo";
import { Component, For } from "solid-js";
import TodoItem from "./TodoItem";

type Props = {
  todos: Readonly<Todo[]>;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoList: Component<Props> = (props) => {
  return (
    <ul class="mt-5 max-h-60 overflow-y-auto">
      <For each={props.todos}>
        {(item) => (
          <TodoItem
            todo={item}
            toggleTodo={props.toggleTodo}
            removeTodo={props.removeTodo}
          />
        )}
      </For>
    </ul>
  )
};

export default TodoList;
