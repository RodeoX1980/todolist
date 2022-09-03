import { Component, Show } from "solid-js";
import { Todo } from "@/store/todo";

type Props = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: Component<Props> = (props) => {
  const { todo, toggleTodo, removeTodo } = props;
  return (
    <li class="pt-2 ml-2 flex justify-between max-w-xs mr-4">
      <div>
        <input type="checkbox" id={todo.id} class="h-4 w-4 rounded-sm shadow" onChange={() => toggleTodo(todo.id)} value="" />
        <label class="pl-2 pr-2 text-gray-800" for={todo.id}>
          <Show
            when={!todo.isCompleted}
            fallback={
              <span class="text-gray-300">{todo.description}</span>
            }>
            {todo.description}
          </Show></label>
      </div>
      <div>
        <button class="px-1 py-1 text-sm rounded shadow bg-cyan-100 hover:bg-cyan-200 text-cyan-500" onClick={() => removeTodo(todo.id)}>Remove</button>
      </div>
    </li>
  );
};

export default TodoItem;
