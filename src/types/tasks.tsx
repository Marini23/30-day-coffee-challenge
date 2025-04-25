export type Task = {
  id: string;
  number: number;
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  completed: boolean;
};

export type Section = {
  id: string;
  title: string;
  tasks: Task[];
};
