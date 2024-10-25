import axios from "axios";
import { Target } from "../types/target";
import { ToDo } from "../types/todo";

// Swager: https://todo-caio.azurewebsites.net/swagger/index.html

const api = axios.create({
  baseURL: "https://todo-caio.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTargets = async () => await api.get("/Targets");

export const getTargetById = async (id: number) => {
  await api.get(`/Targets/${id}`);
};

export const createTarget = async (
  data: Omit<Target, "isComplete" | "id" | "todo">
) => {
  await api.post("/Targets", {
    ...data,
    isComplete: false,
    id: 0,
    todo: [],
  });
};

export const updateTarget = async (
  id: number,
  data: Omit<Target, "id" | "todo">
) => {
  await api.put(`/Targets/${id}`, {
    ...data,
    id: id,
    todo: [],
  });
};

export const deleteTarget = async (id: number) => {
  await api.delete(`/Targets/${id}`);
};

export const getToDos = async () => await api.get("/Todo");

export const getToDoById = async (id: number) => await api.get(`/Todo/${id}`);

export const createToDo = async (data: Omit<ToDo, "id" | "isComplete">) => {
  await api.post("/Todo", {
    ...data,
    id: 0,
    isComplete: false,
  });
};

export const updateToDo = async (id: number, data: Omit<ToDo, "id">) => {
  await api.put(`/Todo/${id}`, {
    ...data,
    id: id
  });
};

export const deleteToDo = async (id: number) => await api.delete(`/Todo/${id}`);
