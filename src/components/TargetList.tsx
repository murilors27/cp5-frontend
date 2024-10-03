import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EditTargetForm from './EditTargetForm';
import EditTodoForm from './EditTodoForm';

interface Target {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TargetList: React.FC<{ targetsUpdated: boolean }> = ({ targetsUpdated }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  
  const [editingTargetId, setEditingTargetId] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    fetchTargets();
  }, [targetsUpdated]);

  const fetchTargets = async () => {
    try {
      const response = await api.get('/targets');
      setTargets(response.data);
    } catch (error) {
      console.error('Erro ao buscar targets:', error);
    }
  };

  const fetchTodos = async (targetId: number) => {
    try {
      const response = await api.get(`/todos?targetId=${targetId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar TODOs:', error);
    }
  };

  const handleTargetClick = (targetId: number) => {
    setSelectedTarget(targetId);
    fetchTodos(targetId);
  };

  return (
    <div>
      <h2>Lista de Targets</h2>
      <ul>
        {targets.map(target => (
          <li key={target.id}>
            <span onClick={() => handleTargetClick(target.id)}>{target.name}</span> {}
            <button onClick={() => setEditingTargetId(target.id)}>Editar</button>
          </li>
        ))}
      </ul>

      {editingTargetId && (
        <EditTargetForm 
          targetId={editingTargetId} 
          onTargetUpdated={() => {
            setEditingTargetId(null);
            fetchTargets();
          }} 
        />
      )}

      {selectedTarget && (
        <div>
          <h3>TODOs para o Target selecionado</h3>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.title} - {todo.completed ? 'Concluído' : 'Pendente'}
                <button onClick={() => setEditingTodoId(todo.id)}>Editar</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {editingTodoId && (
        <EditTodoForm 
          todoId={editingTodoId} 
          onTodoUpdated={() => {
            setEditingTodoId(null);
            fetchTodos(selectedTarget!);
          }} 
        />
      )}
    </div>
  );
};

export default TargetList;
