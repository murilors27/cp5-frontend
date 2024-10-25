import React, { useEffect, useState } from "react";
import { Target } from "../types/target";
import { IoCloseCircleSharp } from "react-icons/io5";

interface EditTargetFormProps {
  target: Omit<Target, "todo">;
  onSubmit: (id: number, data: Omit<Target, "id" | "todo">) => void;
  onClose: () => void;
}

const EditTargetForm: React.FC<EditTargetFormProps> = ({
  target,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState(target.title);
  const [description, setDescription] = useState(target.description);
  const [isComplete, setIsComplete] = useState(target.isComplete);

  useEffect(() => {
    setTitle(target.title);
    setDescription(target.description);
    setIsComplete(target.isComplete);
  }, [target]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(target.id, {
      title: title,
      description: description,
      isComplete: isComplete,
    });
  };

  return (
    <div className="edit-form">
      <div className="edit-form-header">
        <h3>Edit Target</h3>
        <button onClick={onClose} className="close-edit-form">
          <IoCloseCircleSharp size={28} color="#000"/>
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
          required
          minLength={3}
        />
        <div className="edit-checkbox">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          <label>Completo</label>
        </div>
        <button type="submit">Atualizar Target</button>
      </form>
    </div>
  );
};

export default EditTargetForm;
