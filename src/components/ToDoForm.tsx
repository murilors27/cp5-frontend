import React, { useState } from "react";
import { ToDo } from "../types/todo";

interface ToDoFormProps {
  targetId: number;
  onSubmit: (data: Omit<ToDo, "id" | "isComplete">) => void;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ targetId, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, targetId });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="todo-form">
      <h3>Add ToDo</h3>
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
        <button type="submit">Add ToDo</button>
      </form>
    </div>
  );
};

export default ToDoForm;
