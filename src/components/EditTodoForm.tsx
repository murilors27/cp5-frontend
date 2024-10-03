import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface EditTodoFormProps {
  todoId: number;
  onTodoUpdated: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todoId, onTodoUpdated }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/todos/${todoId}`);
        setTitle(response.data.title);
        setCompleted(response.data.completed);
      } catch (error) {
        console.error('Erro ao buscar TODO:', error);
      }
    };

    fetchTodo();
  }, [todoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.put(`/todos/${todoId}`, { title, completed })
      .then(response => {
        console.log('TODO atualizado:', response.data);
        onTodoUpdated();
      })
      .catch(error => {
        console.error('Erro ao atualizar TODO:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Título do TODO"
      />
      <label>
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={(e) => setCompleted(e.target.checked)} 
        />
        Concluído
      </label>
      <button type="submit">Atualizar TODO</button>
    </form>
  );
};

export default EditTodoForm;
