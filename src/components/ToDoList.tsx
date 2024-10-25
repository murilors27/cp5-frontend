import React from "react";
import { ToDo } from "../types/todo";
import { Target } from "../types/target";
import { MdModeEditOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

interface ToDoListProps {
  todos: ToDo[];
  onDeleteToDo: (id: number) => void;
  onEditTodo: (todo: ToDo) => void;
  target: Target;
}

const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  onDeleteToDo,
  onEditTodo,
  target,
}) => {
  return (
    <div className="todo-list">
      <h3>ToDos - {target.title}</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className={todo.isComplete ? "complete-todo" : ""}>
                {todo.title}
              </div>
              <span>
                <button
                  className="editar-todo"
                  onClick={() => onEditTodo(todo)}
                >
                  <MdModeEditOutline size={20} />
                </button>
                <button onClick={() => onDeleteToDo(todo.id)}>
                  <FaRegTrashAlt size={18} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há todos...</p>
      )}
    </div>
  );
};

export default ToDoList;
