import React, { useState } from 'react';
import AddTargetForm from './AddTargetForm';
import TargetList from './TargetList';

const Todo: React.FC = () => {
  const [targetsUpdated, setTargetsUpdated] = useState(false);

  const handleTargetAdded = () => {
    setTargetsUpdated(!targetsUpdated);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTargetForm onTargetAdded={handleTargetAdded} />
      <TargetList targetsUpdated={targetsUpdated} />
    </div>
  );
};

export default Todo;
