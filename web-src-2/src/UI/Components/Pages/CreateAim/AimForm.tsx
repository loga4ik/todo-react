import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimForm.css";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { SubtaskForm } from "./SubtaskForm";
import { AppDispatch, RootState } from "../../../../store";
import { InputAimType } from "../../../../Types/AimListTypes";
import { createUserAimList } from "../../../../Slices/todoSlice/todoSlice";
import { useThemeContext } from "../../../../Hooks/useThemeContext";

export const AimForm = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

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
  } = useFieldArray({
    control,
    // rules: { required: "обязательное поле", minLength: 1 },
    name: "tasks",
  });

  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const formHandleSubmit = (data: InputAimType) => {
    dispatch(createUserAimList(data));
    navigate("/");
  };
  const GoBackHandleSubmit = () => {
    navigate("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(formHandleSubmit)}
        className="create_aim_page"
      >
        <div className="form_head">
          <input
            type="text"
            placeholder="цель"
            className={`aim_input ${
              theme ? "dark_out_small" : "light_out_small"
            }`}
            {...register("text", {
              required: "обязательное поле",
              pattern: {
                value: /^[a-zа-яё\s]+$/iu,
                message: "This input is rus only.",
              },
            })}
          />
          <button
            className={`form_btn ${
              theme ? "dark_out_small text_dark" : "light_out_small"
            }`}
            onClick={GoBackHandleSubmit}
          >
            назад
          </button>
        </div>
        {taskFields.map((task, task_id) => (
          <div key={task_id} className={`aimForm-task ${
            theme ? "dark_in_big text_dark" : "light_out_big"
          }`}>
            <input
              type="text"
              placeholder="задача"
              className={`task_input ${
                theme ? "dark_out_small text_dark" : "light_out_small"
              }`}
              {...control.register(`tasks.${task_id}.text`, {
                required: "обязательное поле",
                pattern: {
                  value: /^[a-zа-яё\s]+$/iu,
                  message: "This input is rus only.",
                },
              })}
            />
            <div className="subTask">
              <SubtaskForm control={control} task={task} task_id={task_id} />
            </div>
            <button
              type="button"
              className={`form_btn ${
                theme ? "dark_out_small text_dark" : "light_out_small"
              }`}
              onClick={() => tasksRemove(task_id)}
            >
              удалить
            </button>
          </div>
        ))}
        <button
          className={`form_btn ${
            theme ? "dark_out_small text_dark" : "light_out_small"
          }`}
          type="button"
          onClick={() => tasksAppend({ text: "", subtasks: [{ text: "" }] })}
        >
          добавить
        </button>
        <button className={`form_btn ${
                theme ? "dark_out_small text_dark" : "light_out_small"
              }`} type="submit">
          сохранить
        </button>
      </form>
    </>
  );
};
