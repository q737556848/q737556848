import { todoType } from "./const";

export type TodoType = typeof todoType;

export type TodoItem = {
  name: string;
  describe?: string;
  timestamp: number;
  isFinish: boolean;
};

export type TodoList = TodoItem[];
