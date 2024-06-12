import React from "react";
import { SubtaskType } from "../../../../../Types/AimListTypes";

type Props = {
  subtask: SubtaskType;
};

export const SubtaskList: React.FC<Props> = ({ subtask }) => {
  return <div className="subtask-element">{subtask.text}</div>;
};
