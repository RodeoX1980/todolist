import { Component, createSignal, Show } from "solid-js";
import { Todo } from "@/store/todo";
import { readSignal } from "solid-js/types/reactive/signal";

type Props = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: Component<Props> = (props) => {
  const { todo, toggleTodo, removeTodo } = props;
  const [show, setShow] = createSignal(false);
  const [anchorPoint, setAnchorPoint] = createSignal({ x: 0, y: 0 });

  // TODO 右クリックイベント
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setAnchorPoint({ x: event.pageX, y: event.pageY });
    setShow(true);
  }

  return (
    <li class="pt-2 ml-2">
      <div class="pb-2 flex justify-between max-w-xs mr-4 border-b-2 border-gray-100" onContextMenu={handleContextMenu}>
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
      </div>
      <Show when={show()}>
        <TageMenu anchorPoint={anchorPoint()} />
      </Show>
    </li>
  );
};

type TagMenuProps = {
  anchorPoint: { x: number, y: number }
}

const TageMenu: Component<TagMenuProps> = (props) => {

  return (
    <div
      class="space-y-5 modal fade fixed top-0 left-0 hidden w-hull h-full outline-none overflow-x-hidden overflow-y-auto"
      id="modal" tabindex="-1" aria-labellebdy="modal" aria-hidden="true"
    >
      <div class="modal-dialog relative w-auto pointer-events-none ">
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-md"
        >
          <h5 class="text-xl font-medium leading-normal text-gray-800" id="modal-label">Modal Title</h5>
          <button type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative p-4">
          Modal body text
        </div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-1 border-gray-200 rounded-md">
          <button type="button" class="px-6
            py-2.5
            bg-purple-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-purple-700 hover:shadow-lg
            focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-purple-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
          " data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  )
};


export default TodoItem;
