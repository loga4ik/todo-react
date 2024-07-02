import React from "react";
import { Control, FieldArrayWithId, useFieldArray } from "react-hook-form";
import { InputAimType } from "../../../../Types/AimListTypes";
import { useThemeContext } from "../../../../Hooks/useThemeContext";

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
          <input
            type="text"
            placeholder="подзача"
            className={`subtask_input ${
              theme ? "dark_out_small text_dark" : "light_out_small"
            }`}
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
          {/* <ErrorMessage
            errors={errors}
            name="multipleErrorInput"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          /> */}
          <button
            className={`aimFormDelete ${
              theme ? "dark_out_small text_dark" : "light_out_small"
            }`}
            type="button"
            onClick={() => subtasksRemove(subtask_id)}
          ></button>
        </div>
      ))}
      <button
        className={`aimFormAdd ${
          theme ? "dark_out_small text_dark" : "light_out_small"
        }`}
        type="button"
        onClick={() => subtasksAppend({ text: "" })}
      ></button>
    </>
  );
};
