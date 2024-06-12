import React from "react";
import { Control, FieldArrayWithId, useFieldArray } from "react-hook-form";
import { InputAimType } from "../../../../../Types/AimListTypes";

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
    name: `tasks.${task_id}.subtasks`, //"tasks.0.subtasks",
  });

  return (
    <>
      {subtakFields.map((subtask, subtask_id) => (
        <div key={`subtask${subtask_id}`}>
          <input
            type="text"
            placeholder="подзача"
            {...control.register(
              `tasks.${task_id}.subtasks.${subtask_id}.text`
            )}
          />
          <button
            className="aimFormDelete"
            type="button"
            onClick={() => subtasksRemove(subtask_id)}
          ></button>
        </div>
      ))}
      <button
        className="aimFormAdd"
        type="button"
        onClick={() => subtasksAppend({ text: "" })}
      ></button>
    </>
  );
};
