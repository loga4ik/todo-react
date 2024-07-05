import React, { useContext } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
} from "react-hook-form";
import { InputAimType } from "../../../../Types/AimListTypes";
import { Button } from "../../../UIKit/Inputs/Button";
import Input from "../../../UIKit/Inputs/Input";

type Props = {
  control: Control<InputAimType>;
  task: FieldArrayWithId<InputAimType, "tasks", "id">;
  task_id: number;
};

export const SubtaskForm: React.FC<Props> = ({ control, task, task_id }) => {
  const {
    fields: subtakFields,
    append: subtasksAppend,
    remove: subtasksRemove,
  } = useFieldArray({
    control,
    name: `tasks.${task_id}.subtasks`,
  });

  return (
    <>
      {subtakFields.map((subtask, subtask_id) => (
        <div key={`subtask${subtask_id}`} className="form_subtask">
          <Controller
            name={`tasks.${task_id}.subtasks.${subtask_id}.text`}
            control={control}
            render={({ field }) => (
              <Input
                className={"subtask_input"}
                inputType="text"
                placeholder="подзача"
                {...field}
              />
            )}
          />
          <Button
            className="aimFormDelete"
            type="button"
            onClick={() => subtasksRemove(subtask_id)}
          />
        </div>
      ))}
      <Button
        className="aimFormAdd"
        type="button"
        onClick={() => subtasksAppend({ text: "" })}
      />
    </>
  );
};
