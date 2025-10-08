export interface Card {
  title: string;
}

export interface ColumnNames {
  PLANNED: string;
  RUNNING: string;
  COMPLETED: string;
}

export type TaskState = "PLANNED" | "RUNNING" | "COMPLETED";

export interface Task {
  id: string;
  content: string;
  state: TaskState;
  userId: string;
}
