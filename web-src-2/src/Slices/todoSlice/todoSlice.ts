import {
  AimType,
  InputTaskType,
  SubtaskType,
  TaskType,
  TodoType,
} from "../../Types/AimListTypes";
import * as todoApi from "./todoApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TaskWithSubtasks = TaskType & {
  subtasks: SubtaskType[];
};

type State = {
  todoList: TodoType[];
  aimList?: AimType[];
  taskList?: TaskType[];
  subtaskList?: SubtaskType[];
};

const initialState: State = {
  todoList: [],
  aimList: [],
  taskList: [],
  subtaskList: [],
};

function unique<T extends { id: number }>(arr: T[]): T[] {
  // T - обобщенный тип, расширяемый id
  // что показывает нам что у каждого объекта в массиве будет поле id
  // (arr: T[]) - массив элементов: T
  let result: T[] = [];
  let seenIds = new Set<number>();
  let counterRepeat = 0;
  for (let task of arr) {
    if (!seenIds.has(task.id)) {
      seenIds.add(task.id);
      result.push(task);
    } else counterRepeat++;
  }
  if (counterRepeat) {
    return [];
  }
  return result;
}

export const userTodos = createAsyncThunk(
  "getUserTodos",
  ({ userId }: { userId: number }) => todoApi.getUserTodos({ userId })
);

export const createUserTodo = createAsyncThunk(
  "createTodo",
  ({ user_id, text }: { user_id: number; text: string }) =>
    todoApi.createTodo({ user_id, text })
);

export const updateUserTodo = createAsyncThunk(
  "updateTodo",
  ({ todo_id, text }: { todo_id: number; text: string }) =>
    todoApi.updateTodo({ todo_id, text })
);

export const switchActiveTodo = createAsyncThunk(
  "switchTodoActive",
  ({ todoId }: { todoId: number }) => todoApi.switchTodoActive({ todoId })
);

export const deleteUserTodo = createAsyncThunk(
  "deleteTodo",
  ({ todoId }: { todoId: number }) => todoApi.deleteTodo({ todoId })
);

export const userAims = createAsyncThunk(
  "getUserAims",
  ({ userId }: { userId: number }) => todoApi.getUserAims({ userId })
);

export const userTasks = createAsyncThunk(
  "getUserTasks",
  ({ aimId }: { aimId: number }) => todoApi.getUserTasks({ aimId })
);

export const userTasksAndSubtasks = createAsyncThunk(
  "getUserTasksAndSubtasks",
  ({ aimId }: { aimId: number }) => todoApi.getUserTasksAndSubtasks({ aimId })
);

export const userSubtasks = createAsyncThunk(
  "getUserSubtasks",
  ({ taskId }: { taskId: number }) => todoApi.getUserSubtasks({ taskId })
);

export const createUserAimList = createAsyncThunk(
  "createAimList",
  ({
    user_id,
    text,
    tasks,
  }: {
    user_id: number | undefined;
    text: string | undefined;
    tasks: InputTaskType[];
  }) => {
    const response = todoApi.createAimList({ user_id, text, tasks });
    return response;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setAllTodoDefault(state) {
      state.aimList = undefined;
      state.subtaskList = [];
      state.taskList = [];
      state.todoList = [];
    },
  },
  extraReducers: (element) => {
    element.addCase(userTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });

    element.addCase(createUserTodo.fulfilled, (state, action) => {
      state.todoList.push(action.payload);
    });

    element.addCase(switchActiveTodo.fulfilled, (state, action) => {
      if (!action.payload.id || !state.todoList) return;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });
    element.addCase(deleteUserTodo.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.todoList = state.todoList.filter((todo) => todo.id != action.payload.id);
      }
    });

    element.addCase(updateUserTodo.fulfilled, (state, action) => {
      if (!action.payload.id) return;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    element.addCase(userAims.fulfilled, (state, action) => {
      state.aimList = action.payload;
    });

    element.addCase(userTasks.fulfilled, (state, action) => {
      state.taskList?.push(...action.payload);
      if (!state.taskList) return;
      state.taskList = unique(state.taskList);
    });

    element.addCase(userSubtasks.fulfilled, (state, action) => {
      state.subtaskList?.push(...action.payload);
      if (!state.subtaskList) return;
      state.subtaskList = unique(state.subtaskList);
    });

    element.addCase(userTasksAndSubtasks.fulfilled, (state, action) => {
      const subtaskList = action.payload.map(
        (task: TaskWithSubtasks) => task.subtasks
      );

      state.subtaskList?.push(...subtaskList.flat());
      if (!state.subtaskList) return;
      state.subtaskList = unique(state.subtaskList);

      state.taskList?.push(...action.payload);
      if (!state.taskList) return;
      state.taskList = unique(state.taskList);
    });

    element.addCase(createUserAimList.fulfilled, (state, action) => {
      state.aimList?.push(action.payload);
      if (!state.aimList) return;
      state.aimList = unique(state.aimList);
    });
  },
});

export const { setAllTodoDefault } = todoSlice.actions;
export default todoSlice.reducer;
