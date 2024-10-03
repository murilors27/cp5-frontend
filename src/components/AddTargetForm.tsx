import React, { useState } from 'react';
import api from '../services/api';

const AddTargetForm: React.FC<{ onTargetAdded: () => void }> = ({ onTargetAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.post('/targets', { name })
      .then(response => {
        console.log('Target adicionado:', response.data);
        setName('');
        onTargetAdded();
      })
      .catch(error => {
        console.error('Erro ao adicionar target:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nome do Target"
      />
      <button type="submit">Adicionar Target</button>
    </form>
  );
};

export default AddTargetForm;
