import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import {
  createUserTodo,
  userTodos,
} from "../../../../../Slices/todoSlice/todoSlice";
import { TodoItem } from "./TodoItem";
import { CurrentUser } from "../../../../../Slices/userSlice/userSlice";
import "./Todo.css";
import { ComplitedTodo } from "./ComplitedTodo";
import { NewTodo } from "./NewTodo";
type Props = {
  currentUser: CurrentUser;
};

export const TodoList: React.FC<Props> = ({ currentUser }) => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>("");

  const comlitedTodo = todoList.filter((todo) => !todo.is_active);
  const newTodo = todoList.filter((todo) => todo.is_active);

  useEffect(() => {
    if (currentUser) {
      dispatch(userTodos({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

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
    <>
      <div className="todoBlock pageBlock">
        <p>новые задачи</p>
        <form className="todo-create-from" onSubmit={formSubmitHandler}>
          <input
            className="form_input"
            type="text"
            value={text}
            placeholder="добавить новую"
            onChange={(e) => setText(e.target.value)}
          />
          <div className="aimFormAdd" onClick={formSubmitHandler}></div>
        </form>
        {newTodo && <NewTodo todoList={newTodo} />}
      </div>
      <div className="todoBlock pageBlock">
      <p>выполненные задачи</p>
      {comlitedTodo && <ComplitedTodo todoList={comlitedTodo} />}
      </div>
    </>
  );
};
// {newTodo &&
//         newTodo.map((todo) => <TodoItem key={`todo.${todo.id}`} todo={todo} />)}
//       {comlitedTodo && (
//         <>
//           <hr />
//           {comlitedTodo.map((todo) => (
//             <TodoItem key={`todo.${todo.id}`} todo={todo} />
//           ))}
//         </>
//       )}
