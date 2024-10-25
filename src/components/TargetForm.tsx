import React, { useState } from 'react';

interface TargetFormProps {
  onSubmit: (data: { title: string; description: string }) => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="target-form">
      <h3>Add Target</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
          minLength={3}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          required
          minLength={3}
        />
        <button type="submit">Add Target</button>
      </form>
    </div>
  );
};

export default TargetForm;
