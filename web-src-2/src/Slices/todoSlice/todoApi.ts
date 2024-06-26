import { InputTaskType } from "../../Types/AimListTypes";

export const createTodo = async ({
  user_id,
  text,
}: {
  user_id: number;
  text: string;
}) => {
  try {
    const response = await fetch("user_todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        text: text,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
  return;
};

export const updateTodo = async ({
  todo_id,
  text,
}: {
  todo_id: number;
  text: string;
}) => {
  try {
    const response = await fetch(`user_todo/update/${todo_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
  return;
};

export const getUserTodos = async ({ userId }: { userId: number }) => {
  const abortController = new AbortController();
  try {
    const response = await fetch(`user_todo/${userId}`, {
      signal: abortController.signal,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  } finally {
    // abortController.abort();
  }
};

export const switchTodoActive = async ({ todoId }: { todoId: number }) => {
  try {
    const response = await fetch(`user_todo/inactive/${todoId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async ({ todoId }: { todoId: number }) => {
  try {
    const response = await fetch(`user_todo/delete/${todoId}`, {
      method: "delete",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createAimList = async ({
  user_id,
  text,
  tasks,
}: {
  user_id: number | undefined;
  text: string | undefined;
  tasks: InputTaskType[];
}) => {
  try {
    const response = await fetch("user_aim/create-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        text: text,
        tasks: tasks,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
  return;
};

export const getUserAims = async ({ userId }: { userId: number }) => {
  try {
    const response = await fetch(`user_aim/${userId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserTasks = async ({ aimId }: { aimId: number }) => {
  try {
    const response = await fetch(`user_task/${aimId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserTasksAndSubtasks = async ({ aimId }: { aimId: number }) => {
  try {
    const response = await fetch(`user_task/taskAndSubtasks/${aimId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserSubtasks = async ({ taskId }: { taskId: number }) => {
  try {
    const response = await fetch(`user_subtask/${taskId}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
