import { useTodo } from "@/store/todo";
import { Component } from "solid-js";
import Input from "./Input";
import TodoList from "./TodoList";

const TodoPage: Component = () => {
  const { state, addTodo, toggleTodo, removeTodo } = useTodo();

  return (
    <>
      <div class="flex justify-center bg-white h-screen pt-4">
        <div>
          <div>
            <h1 class="text-4xl font-sans">Todo</h1>
          </div>
          <div class="pt-5">
            <Input addTodo={addTodo} />
            <TodoList
              todos={state.todos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
