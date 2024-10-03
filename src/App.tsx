import React from 'react';
import Todo from './components/Todo';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <Todo /> {}
    </div>
  );
};

export default App;
