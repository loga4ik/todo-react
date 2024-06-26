import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  text: string;
};
type Props = {
  propsFunc: (text: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  text: string;
};

export const RenameInput: React.FC<Props> = ({
  propsFunc,
  setIsOpen,
  isOpen,
  text,
}) => {
  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      text: text,
    },
  });

  const formSubmitHandler = (data: FormType) => {
    propsFunc(data.text);
    //reset - сброс значений инпута
    reset({ text: "" });
    setIsOpen(!isOpen);
  };
  return (
    <form className="edit-from" onSubmit={handleSubmit(formSubmitHandler)}>
      <input
        className="form_input"
        type="text"
        placeholder="new title"
        {...register("text")}
      />
      <button className="edit_form_btn" onSubmit={handleSubmit(formSubmitHandler)}>
        изменить
      </button>
    </form>
  );
};
