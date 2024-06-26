import React, { memo } from "react";
import { TodoType } from "../../../../Types/AimListTypes";
import { TodoItem } from "./TodoItem";
type TodoList = {
  todoList: TodoType[];
};
export const ComplitedTodo: React.FC<TodoList> = memo(({ todoList }) => {
  return (
    <>
      {todoList.map((todo) => (
        <TodoItem key={`todo.${todo.id}`} todo={todo} />
      ))}
    </>
  );
});
