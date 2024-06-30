import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useThemeContext } from "../../Hooks/useThemeContext";

type FormType = {
  text: string;
};
type Props = {
  propsFunc: (text: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  deleteTodo: () => void;
  isOpen: boolean;
  text: string;
};

export const RenameInput: React.FC<Props> = ({
  propsFunc,
  setIsOpen,
  deleteTodo,
  isOpen,
  text,
}) => {
  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      text: text,
    },
  });
  const { isDark } = useThemeContext();
  const deleteItemHandler = () => {
    deleteTodo();
  };
  
  const formSubmitHandler = (data: FormType) => {
    propsFunc(data.text);
    //reset - сброс значений инпута
    reset({ text: "" });
    setIsOpen(!isOpen);
  };
  return (
    <form className="edit-from" onSubmit={handleSubmit(formSubmitHandler)}>
      <input
        className={`form_input ${
          isDark ? "dark_out_smaill text_dark " : "light_out_small"
        }`}
        type="text"
        placeholder="new title"
        {...register("text")}
      />
      <button
        className={`edit_form_btn ${
          isDark ? "dark_out_smaill text_dark" : "light_out_small"
        }`}
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        сохранить
      </button>
      <button
        className={`edit_form_btn ${
          isDark ? "dark_out_smaill text_dark" : "light_out_small"
        }`}
        onClick={handleSubmit(deleteItemHandler)}
      >
        удалить
      </button>
    </form>
  );
};
