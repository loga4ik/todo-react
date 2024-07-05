import React, { useContext } from "react";
import { SubtaskType } from "../../../../../Types/AimListTypes";
import { useThemeContext } from "../../../../../Hooks/useThemeContext";
import { ThemeContext } from "../../../../../Context/ThemeContext";

type Props = {
  subtask: SubtaskType;
};

export const SubtaskList: React.FC<Props> = ({ subtask }) => {
  const { theme } = useContext(ThemeContext);

  return <div className={`subtask-element ${theme === 'dark' && "text_dark subtask-element-dark"}`}>{subtask.text}</div>;
};
