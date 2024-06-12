import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { createUserTodo } from "../../../../../Slices/todoSlice/todoSlice";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>("");

  const formSubmitHandler = (
    e: React.FormEvent<HTMLFormElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    if (currentUser?.id && text) {
      dispatch(createUserTodo({ user_id: currentUser.id, text: text }));
      setText("");
    }
  };
  return (
    <div className="todoBlock pageBlock">
      {currentUser?.login}
      <form className="todo-create-from" onSubmit={formSubmitHandler}>
        <input
          className="form_input"
          type="text"
          value={text}
          placeholder="new task"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="aimFormAdd" onClick={formSubmitHandler}></div>
      </form>
      {todoList &&
        todoList.map((todo) => (
          <TodoItem key={`todo.${todo.id}`} todo={todo} />
        ))}
    </div>
  );
};
