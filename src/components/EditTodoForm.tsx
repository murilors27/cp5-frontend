import React, { useEffect, useState } from "react";
import { ToDo } from "../types/todo";
import { IoCloseCircleSharp } from "react-icons/io5";

interface EditToDoFormProps {
  todo: ToDo;
  onSubmit: (todo: ToDo) => void;
  onCloseEditTodo: () => void;
}

const EditToDoForm: React.FC<EditToDoFormProps> = ({
  todo,
  onSubmit,
  onCloseEditTodo,
}) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [isComplete, setIsComplete] = useState(todo.isComplete || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...todo,
      title: title,
      description: description,
      isComplete: isComplete,
    });
  };

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setIsComplete(todo.isComplete);
  }, [todo]);

  return (
    <div className="edit-form">
      <div className="edit-form-header">
        <h3>Edit ToDo</h3>
        <button onClick={onCloseEditTodo} className="close-edit-form">
          <IoCloseCircleSharp size={28} color="#000" />
        </button>
      </div>
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
        />
        <div className="edit-checkbox">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          <label>Completo</label>
        </div>
        <button type="submit">Atualizar ToDo</button>
      </form>
    </div>
  );
};

export default EditToDoForm;
