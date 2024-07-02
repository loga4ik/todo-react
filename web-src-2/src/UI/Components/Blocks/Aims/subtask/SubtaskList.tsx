import React from "react";
import { SubtaskType } from "../../../../../Types/AimListTypes";
import { useThemeContext } from "../../../../../Hooks/useThemeContext";

type Props = {
  subtask: SubtaskType;
};

export const SubtaskList: React.FC<Props> = ({ subtask }) => {
  const { theme } = useThemeContext();

  return <div className={`subtask-element ${theme === 'dark' && "text_dark subtask-element-dark"}`}>{subtask.text}</div>;
};
