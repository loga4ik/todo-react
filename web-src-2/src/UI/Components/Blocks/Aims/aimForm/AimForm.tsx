import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimForm.css";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { SubtaskForm } from "./SubtaskForm";
import { AppDispatch, RootState } from "../../../../../store";
import { InputAimType } from "../../../../../Types/AimListTypes";
import { createUserAimList } from "../../../../../Slices/todoSlice/todoSlice";

export const AimForm = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<InputAimType>({
    defaultValues: {
      user_id: currentUser?.id,
      text: "",
      tasks: [
        {
          text: "",
          subtasks: [
            {
              text: "",
            },
          ],
        },
      ],
    },
  });

  const {
    fields: taskFields,
    append: tasksAppend,
    remove: tasksRemove,
  } = useFieldArray({ control, name: "tasks" });

  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const formHandleSubmit = (data: InputAimType) => {
    dispatch(createUserAimList(data));
    navigate("/todo");
  };

  return (
    <>
      <div>Aim</div>
      <form onSubmit={handleSubmit(formHandleSubmit)}>
        <input
          type="text"
          placeholder="цель"
          className="listElement"
          {...register("text")}
        />
        {taskFields.map((task, task_id) => (
          <div key={task_id} className="aimForm-task">
            <input
              type="text"
              placeholder="задача"
              {...control.register(`tasks.${task_id}.text`)}
            />
            <div className="subTask">
              <SubtaskForm control={control} task={task} task_id={task_id} />
            </div>
            <button type="button" onClick={() => tasksRemove(task_id)}>
              удалить
            </button>
          </div>
        ))}
        <button
          type="button"
          className="button"
          onClick={() => tasksAppend({ text: "", subtasks: [{ text: "" }] })}
        >
          добавить
        </button>
        <button type="submit">сохранить</button>
      </form>
    </>
  );
};
