import React, { useState, useEffect } from "react";
import TargetList from "./components/TargetList";
import ToDoList from "./components/ToDoList";
import TargetForm from "./components/TargetForm";
import ToDoForm from "./components/ToDoForm";
import EditTargetForm from "./components/EditTargetForm";
import EditToDoForm from "./components/EditToDoForm";
// import Logo from "/todo-icon.png"
import {
  getTargets,
  createTarget,
  updateTarget,
  deleteTarget,
  getToDos,
  createToDo,
  updateToDo,
  deleteToDo,
} from "./service/api";
import { ToDo } from "./types/todo";
import { Target } from "./types/target";

const App: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [todos, setToDos] = useState<ToDo[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

  useEffect(() => {
    fetchTargets();
    fetchToDos();
  }, []);

  const fetchTargets = async () => {
    const response = await getTargets();
    setTargets(response.data);
  };

  const fetchToDos = async () => {
    const response = await getToDos();
    setToDos(response.data);
  };

  const handleAddTarget = async (
    data: Omit<Target, "isComplete" | "id" | "todo">
  ) => {
    await createTarget(data);
    fetchTargets();
  };

  const handleDeleteTarget = async (id: number) => {
    await deleteTarget(id);
    fetchTargets();
  };

  const handleAddToDo = async (data: Omit<ToDo, "id" | "isComplete">) => {
    await createToDo(data);
    fetchToDos();
  };

  const handleDeleteToDo = async (id: number) => {
    await deleteToDo(id);
    fetchToDos();
  };

  const handleUpdateToDo = async (id: number, data: Omit<ToDo, "id">) => {
    await updateToDo(id, data);
    fetchToDos();
    setSelectedToDo(null);
  };

  const handleUpdateTarget = async (
    id: number,
    data: Omit<Target, "id" | "todo">
  ) => {
    await updateTarget(id, data);
    fetchTargets();
    setSelectedTarget(null);
  };

  const handleCloseEdit = () => {
    setSelectedTarget(null);
  };

  const handleCloseEditTodo = () => {
    setSelectedToDo(null);
  };

  return (
    <main>
      <div className="app-title">
        {/* <img src={Logo} alt="Logo todo App"/> */}
        <h1>App ToDo</h1>
      </div>
      <section className="app">
        <div className="left">
          <TargetForm onSubmit={handleAddTarget} />
          <TargetList
            targets={targets}
            onSelectTarget={setSelectedTarget}
            onDeleteTarget={handleDeleteTarget}
          />
          {selectedTarget && (
            <EditTargetForm
              target={selectedTarget}
              onSubmit={handleUpdateTarget}
              onClose={handleCloseEdit}
            />
          )}
        </div>

        <div className="right">
          {selectedTarget ? (
            <>
              <ToDoForm targetId={selectedTarget.id} onSubmit={handleAddToDo} />
              <ToDoList
                todos={todos.filter(
                  (todo) => todo.targetId === selectedTarget.id
                )}
                onDeleteToDo={handleDeleteToDo}
                onEditTodo={(todo) => setSelectedToDo(todo)}
                target={selectedTarget}
              />
              {selectedToDo && (
                <EditToDoForm
                  todo={selectedToDo}
                  onSubmit={(data) => handleUpdateToDo(selectedToDo.id, data)}
                  onCloseEditTodo={handleCloseEditTodo}
                />
              )}
            </>
          ) : (
            <div className="no-selected-target">
              Nenhum target selecionado...
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
