import type { Component } from 'solid-js';
import TodoPage from '@/components/layout/TodoPage';
import Menu from '@/components/layout/Menu';

const App: Component = () => {
  return (
    <>
      <Menu />
      <TodoPage />
    </>
  );
};

export default App;
