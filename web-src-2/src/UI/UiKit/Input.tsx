import React, {
  BaseSyntheticEvent,
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { useThemeContext } from "../../Hooks/useThemeContext";
import { Control } from "react-hook-form";

type props = {
  inputType: "btn" | "text" | "password";
  className?: string;
  placeholder?: string;
  control?: Control;
  value?: string;
  changableIconClass?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | BaseSyntheticEvent
  ) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register?: {};
  children?: ReactNode;
};

export const Input: React.FC<props> = ({
  inputType,
  className,
  changableIconClass,
  placeholder,
  control,
  value,
  onClick,
  onChange,
  register,
  children,
}) => {
  const { theme } = useThemeContext();
  return (
    <>
      {inputType === "btn" ? (
        <button
          className={`${className} ${
            changableIconClass
              ? theme !== "dark"
                ? changableIconClass
                : changableIconClass + "_dark"
              : ""
          } ${
            theme === "dark"
              ? "dark_out_small text_dark"
              : "light_out_small text_light"
          }`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <input
          className={`${className} ${
            theme === "dark"
              ? "dark_out_small text_dark"
              : "light_out_small text_light"
          }`}
          type={inputType}
          placeholder={placeholder}
          {...register}
          {...control}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};
