import React from "react";
import { Control, FieldArrayWithId, useFieldArray } from "react-hook-form";
import { InputAimType } from "../../../../Types/AimListTypes";
import { useThemeContext } from "../../../../Hooks/useThemeContext";
import { Input } from "../../../UIKit/Input";

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
  const { theme } = useThemeContext();

  return (
    <>
      {subtakFields.map((subtask, subtask_id) => (
        <div key={`subtask${subtask_id}`} className="form_subtask">
          <Input
            inputType="text"
            placeholder="подзача"
            className="subtask_input"
            {...control.register(
              `tasks.${task_id}.subtasks.${subtask_id}.text`,
              {
                required: "обязательное поле",
                pattern: {
                  value: /^[a-zа-яё\s]+$/iu,
                  message: "This input is rus only.",
                },
              }
            )}
          />
          <Input
            className={`aimFormDelete ${
              theme ? "dark_out_small text_dark" : "light_out_small"
            }`}
            inputType="btn"
            onClick={() => subtasksRemove(subtask_id)}
          />
        </div>
      ))}
      <Input
        className={`aimFormAdd ${
          theme ? "dark_out_small text_dark" : "light_out_small"
        }`}
        inputType="btn"
        onClick={() => subtasksAppend({ text: "" })}
      />
    </>
  );
};
