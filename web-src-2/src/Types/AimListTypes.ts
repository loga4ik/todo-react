export type InputAimType = {
  user_id: number;
  text: string;
  tasks: InputTaskType[];
};

export type InputTaskType = {
  text: string;
  subtasks: InputSubtaskType[];
};

export type InputSubtaskType = {
  text: string;
};

export type AimType = {
  //переименовать
  id: number;
  user_id: number;
  text: string;
  createdAt: Date;
  updateAt: Date;
  //is_empty
  // taskArr?: TaskType[];
};

export type TaskType = {
  id: number;
  aim_id: number;
  text: string;
  createdAt: Date;
  updateAt: Date;
  // subtaskArr?: SubtaskType[]; //
};

export type SubtaskType = {
  id: number;
  task_id: number;
  text: string;
  is_active: boolean;
  createdAt: Date;
  updateAt: Date;
};

export type TodoType = {
  id: number;
  user_id: number;
  is_active: boolean;
  text: string;
  createdAt: Date;
  updateAt: Date;
};
