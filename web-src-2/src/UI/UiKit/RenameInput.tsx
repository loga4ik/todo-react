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
  const { theme } = useThemeContext();
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
          theme === 'dark' ? "dark_out_small text_dark " : "light_out_small"
        }`}
        type="text"
        placeholder="new title"
        {...register("text")}
      />
      <button
        className={`edit-element  margin_left_1 ${
          theme === 'dark' ? "dark_out_small" : "light_out_small"
        } ${theme === 'dark' ? "save_dark" : "save"} `}
        onSubmit={handleSubmit(formSubmitHandler)}
      />
      <button
        className={`edit-element  margin_left_1 ${
          theme === 'dark' ? "dark_out_small" : "light_out_small"
        } ${theme === 'dark' ? "bin_dark" : "bin"} `}
        onClick={handleSubmit(deleteItemHandler)}
      />
    </form>
  );
};
