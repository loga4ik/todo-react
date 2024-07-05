import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimForm.css";
import { useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { SubtaskForm } from "./SubtaskForm";
import { AppDispatch, RootState } from "../../../../store";
import { InputAimType } from "../../../../Types/AimListTypes";
import { createUserAimList } from "../../../../Slices/todoSlice/todoSlice";
import { Wrapper } from "../../../UIKit/Wrapper";
import { Button } from "../../../UIKit/Inputs/Button";
import Input from "../../../UIKit/Inputs/Input";

export const AimForm = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { watch, handleSubmit, control } = useForm<InputAimType>({
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
    name: "tasks",
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const formHandleSubmit = (data: InputAimType) => {
    console.log(data);

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
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <Input
                className={"aim_input"}
                inputType="text"
                placeholder="цель"
                {...field}
              />
            )}
          />
          <Button
            className="form_btn"
            type="button"
            onClick={GoBackHandleSubmit}
          >
            назад
          </Button>
        </div>
        {taskFields.map((task, task_id) => (
          <Wrapper key={task_id} className="aimForm-task">
            <Controller
              name={`tasks.${task_id}.text`}
              control={control}
              render={({ field }) => (
                <Input
                  className={"task_input"}
                  inputType="text"
                  placeholder="задача"
                  {...field}
                />
              )}
            />
            <div className="subTask">
              <SubtaskForm control={control} task={task} task_id={task_id} />
            </div>
            <Button
              className="form_btn"
              type="button"
              onClick={() => tasksRemove(task_id)}
            >
              удалить
            </Button>
          </Wrapper>
        ))}
        <Button
          className="form_btn"
          type="button"
          onClick={() => tasksAppend({ text: "", subtasks: [{ text: "" }] })}
        >
          добавить
        </Button>

        <Button className="form_btn" type="submit">
          сохранить
        </Button>
      </form>
      {watch("text")}
    </>
  );
};
