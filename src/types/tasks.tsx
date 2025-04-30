export type Task = {
  number: number;
  createdAt: number;
  updatedAt: number;
  completed: boolean;
};

export type Section = {
  title: string;
  tasks: Task[];
};

export type DefaultTask = {
  number: number;
  completed: boolean;
};

export type DefaultSection = {
  title: string;
  tasks: DefaultTask[];
};
