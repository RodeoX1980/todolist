import { Component, createEffect, createSignal, For, Setter, Show } from "solid-js";
import { Todo } from "@/store/todo";

type Props = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  addTag: (id: string, tagName: string) => void;
  removeTag: (id: string, tagName: string) => void;
}

const TodoItem: Component<Props> = (props) => {
  const { todo, toggleTodo, removeTodo } = props;
  const [show, setShow] = createSignal(false);

  let documentBody: EventListener;
  let popupRef: HTMLDivElement | undefined;

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    if (show()) {
      setShow(false);
      return;
    }
    setShow(true);
  }

  createEffect(() => {
    document.body.addEventListener('click', e => {
      if (show() && popupRef !== undefined) {
        if (popupRef.contains(e.target as HTMLDivElement)) return;
        setShow(false);
        document.body.removeEventListener('click', documentBody);
      }
    });
  });

  console.log("タグ状態: ", todo.tags);

  return (
    <div>
      <li class="pt-2 ml-2 w-lg max-w-screen-lg">
        <div class="pb-2 flex justify-between max-w-screen-xl mr-4 border-b-2 border-gray-100" onContextMenu={handleContextMenu}>
          <div>
            <input type="checkbox" id={todo.id} class="h-4 w-4 rounded-sm shadow" onChange={() => toggleTodo(todo.id)} value="" />
            <label class="pl-2 pr-2 text-gray-800" for={todo.id}>
              <Show
                when={!todo.isCompleted}
                fallback={<span class="text-gray-300">{todo.description}</span>}
              >
                {todo.description}
              </Show>
            </label>
          </div>
          <div class="justify-item-end">
            <For each={todo.tags}>
              {(tag) => (
                <div class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-hard-drive mr-2"
                  >
                    <line x1="22" y1="12" x2="2" y2="12"></line>
                    <path
                      d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                    ></path>
                    <line x1="6" y1="16" x2="6.01" y2="16"></line>
                    <line x1="10" y1="16" x2="10.01" y2="16"></line>
                  </svg>
                  {tag}
                </div>
              )}
            </For>
          </div>
          <div>
            <button class="px-1 py-1 text-sm rounded shadow bg-cyan-100 hover:bg-cyan-200 text-cyan-500" onClick={() => removeTodo(todo.id)}>Remove</button>
          </div>
        </div>
        <Show when={show()}>
          <TageMenu id={todo.id} addTag={props.addTag} ref={popupRef} isShow={setShow} />
        </Show>
      </li >
    </div >
  );
};

type TagMenuProps = {
  id: string;
  ref: HTMLDivElement | undefined;
  addTag: (id: string, tagName: string) => void;
  isShow: Setter<boolean>;
}

const TageMenu: Component<TagMenuProps> = (props) => {

  const id = props.id;
  const tagName = [
    "タグA",
    "タグB",
    "Simpleタグ"
  ];

  const handleMenuClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target === undefined || target.textContent === null) return;
    props.addTag(id, target.textContent);
    props.isShow(false);
  }

  return (
    <div class="block z-0 fixed" ref={props.ref} >
      <div class="bg-white w-60 border border-gray-300 rounded-lg flex flex-col text-sm py-4 px-2 text-gray-500 shadow-lg">
        <For each={tagName}>
          {(tag) => (
            <div class="flex hover:bg-gray-100 py-1 px-2 rounded" onClick={handleMenuClick}>
              <div class="flex hover:bg-gray-100 py-1 px-2 rounded">
                <div>{tag}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default TodoItem;
