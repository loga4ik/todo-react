import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  text: string;
};
type Props = {
  propsFunc: (text: string) => void;
};

export const RenameInput: React.FC<Props> = ({ propsFunc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      text: "",
    },
  });

  const formSubmitHandler = (data: FormType) => {
    propsFunc(data.text);
    //reset - сброс значений инпута
    reset({ text: "" });
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="edit-element" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <form className="edit-from" onSubmit={handleSubmit(formSubmitHandler)}>
          <input
            className="form_input"
            type="text"
            placeholder="new title"
            {...register("text")}
          />
          <button
            className="form_btn"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            изменить
          </button>
        </form>
      )}
    </>
  );
};
