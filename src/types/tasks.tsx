export type Task = {
  number: number;
  createdAt?: number;
  updatedAt?: number;
  completed: boolean;
};

export type Section = {
  title: string;
  tasks: Task[];
};
