import React, { FC, ReactNode } from "react";
import { useThemeContext } from "../../Hooks/useThemeContext";

type props = {
  className?: string;
  key?: string;
  children: ReactNode;
};

export const Wrapper: React.FC<props> = ({ children, className, key }) => {
  const { theme } = useThemeContext();
  return (
    <div
      key={key}
      className={`wrapper ${theme === "dark" && "dark_in_big"} ${className}`}
    >
      {children}
    </div>
  );
};
