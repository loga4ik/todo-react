import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  createUserTodo,
  userTodos,
} from "../../../../Slices/todoSlice/todoSlice";
import { TodoItem } from "./TodoItem";
import { CurrentUser } from "../../../../Slices/userSlice/userSlice";
import "./Todo.css";
import { ComplitedTodos } from "./ComplitedTodos";
import { NewTodos } from "./NewTodos";
import { useThemeContext } from "../../../../Hooks/useThemeContext";
import { Wrapper } from "../../../UIKit/Wrapper";
import { Input } from "../../../UIKit/Input";
import { useForm } from "react-hook-form";
type FormType = {
  text: string;
};
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

  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      text: "",
    },
  });

  const formSubmitHandler = () => {
    if (currentUser?.id && text) {
      dispatch(createUserTodo({ user_id: currentUser.id, text: text }));
      setText("");
    }
  };

  return (
    <div className="todoBlock">
      <Wrapper className="pageBlock">
        <p>новые задачи</p>
        <form
          className="todo-create-from"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <Input
            className="form_input"
            inputType="text"
            value={text}
            placeholder="добавить новую"
            onChange={(e) => setText(e.target.value)}
            register={{ ...register("text") }}
          />
          <Input
            inputType="btn"
            className="form_add btn_image"
            onClick={handleSubmit(formSubmitHandler)}
          />
        </form>
        {newTodo && <NewTodos todoList={newTodo} />}
      </Wrapper>
      {comlitedTodo[0] && (
        <Wrapper className="pageBlock">
          <p>выполненные задачи</p>
          <ComplitedTodos todoList={comlitedTodo} />
        </Wrapper>
      )}
    </div>
  );
};
