import React, { useState } from 'react';
import api from '../services/api';

const AddTodoForm: React.FC<{ targetId: number; onTodoAdded: () => void }> = ({ targetId, onTodoAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.post('/todos', { title, targetId })
      .then(response => {
        console.log('TODO adicionado:', response.data);
        setTitle('');
        onTodoAdded();
      })
      .catch(error => {
        console.error('Erro ao adicionar TODO:', error);
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
      <button type="submit">Adicionar TODO</button>
    </form>
  );
};

export default AddTodoForm;
