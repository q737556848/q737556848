import { todoTypeList } from "./const";

export type TodoType = typeof todoTypeList[number];

export type TodoItem = {
  name: string;
  describe?: string;
  timestamp: number;
  isFinish: boolean;
};

export type TodoList = TodoItem[];
