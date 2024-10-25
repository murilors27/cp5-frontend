import { ToDo } from "./todo";

export type Target = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  todo: Array<ToDo>
};
