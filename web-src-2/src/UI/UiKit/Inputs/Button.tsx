import React, { BaseSyntheticEvent, ReactNode, useContext } from "react";
import { ThemeContext } from "../../../Context/ThemeContext";

type props = {
  className?: string;
  changableIconClass?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | BaseSyntheticEvent
  ) => void;
  children?: ReactNode;
  type: "submit" | "button";
};

export const Button: React.FC<props> = ({
  className,
  changableIconClass,
  onClick,
  children,
  type,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <button
        type={type ? type : "button"}
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
    </>
  );
};
