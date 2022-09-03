import { Component } from "solid-js";

type Props = {
  addTodo: (text: string) => void;
}

const Input: Component<Props> = (props) => {
  const { addTodo } = props;
  let input!: HTMLInputElement;

  const onSubmit = () => {
    if (!input.value.trim()) return;
    addTodo(input.value);
    input.value = "";
  }

  return (
    <div class="flex">
      <input type="text" ref={input} class="input-area" />
      <button class="button" onClick={() => onSubmit()}>Add Todo</button>
    </div>
  )
}

export default Input;
