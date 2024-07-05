import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import {
  createUserTodo,
  userTodos,
} from "../../../../Slices/todoSlice/todoSlice";
import { CurrentUser } from "../../../../Slices/userSlice/userSlice";
import "./Todo.css";
import { ComplitedTodos } from "./ComplitedTodos";
import { NewTodos } from "./NewTodos";
import { Wrapper } from "../../../UIKit/Wrapper";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../UIKit/Inputs/Input";
import { Button } from "../../../UIKit/Inputs/Button";

type FormType = {
  text: string;
};
type Props = {
  currentUser: CurrentUser;
};

export const TodoList: React.FC<Props> = ({ currentUser }) => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch<AppDispatch>();
  // const [text, setText] = useState<string>("");

  const comlitedTodo = todoList.filter((todo) => !todo.is_active);
  const newTodo = todoList.filter((todo) => todo.is_active);

  useEffect(() => {
    if (currentUser) {
      dispatch(userTodos({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      text: "",
    },
  });

  const formSubmitHandler = (data: FormType) => {
    dispatch(createUserTodo({ user_id: currentUser.id, text: data.text }));
    reset();
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
            placeholder="добавить новую"
            register={register("text")}
          />
          <Button
            type="submit"
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
