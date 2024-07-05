import React, { ChangeEventHandler, ReactNode, forwardRef, useContext } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useThemeContext } from "../../../Hooks/useThemeContext";
import { ThemeContext } from "../../../Context/ThemeContext";

type Props = {
  inputType: "text" | "password";
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  register?: UseFormRegisterReturn;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ inputType, className, placeholder, register, value, onChange }, ref) => {
    const { theme } = useContext(ThemeContext);

    return (
      <input
        ref={ref}
        className={`${className} ${
          theme === "dark"
            ? "dark_out_small text_dark"
            : "light_out_small text_light"
        }`}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register}
      />
    );
  }
);

export default Input;
