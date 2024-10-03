import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface EditTargetFormProps {
  targetId: number;
  onTargetUpdated: () => void;
}

const EditTargetForm: React.FC<EditTargetFormProps> = ({ targetId, onTargetUpdated }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const response = await api.get(`/targets/${targetId}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar target:', error);
      }
    };

    fetchTarget();
  }, [targetId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.put(`/targets/${targetId}`, { name })
      .then(response => {
        console.log('Target atualizado:', response.data);
        onTargetUpdated();
      })
      .catch(error => {
        console.error('Erro ao atualizar target:', error);
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
      <button type="submit">Atualizar Target</button>
    </form>
  );
};

export default EditTargetForm;
