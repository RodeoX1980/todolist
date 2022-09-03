import { Component } from "solid-js";

const Menu: Component = () => {
  return (
    <div class="bg-blue-500 p-4 text-white">
      <nav class="flex justify-between mx-auto container items-center">
        <div class="text-3xl">TodoList</div>
        <div class="space-x-10">
          <a href="">TodoList</a>
          <a href="">ダッシュボード</a>
          <a href="">プロファイル</a>
        </div>
      </nav>
    </div>
  )
};

export default Menu;
