import React, { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TaskType } from "../../../../../Types/AimListTypes";
import { RootState } from "../../../../../store";
import { SubtaskList } from "../subtask/SubtaskList";

type Props = {
  task: TaskType;
};

export const TaskList: React.FC<Props> = memo(({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subtaskList = useSelector((state: RootState) => state.todo.subtaskList);

  //получается у нас не будет лишней фильтрации при посторной отрисовке компанента
  const subtasks = useMemo(
    () => subtaskList?.filter((subtask) => subtask.task_id === task.id),
    [subtaskList, task.id]
  );

  return (
    <div className="taskList">
      <div>
        <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
          {task.text}
          {subtasks && subtasks[0] && (
            <i className={`fi-rr-angle-left ${isOpen ? "open" : "close"}`}></i>
          )}
        </div>
        {isOpen &&
          subtasks?.map((subtask) => (
            <SubtaskList subtask={subtask} key={`subtask${subtask.id}`} />
          ))}
      </div>
    </div>
  );
});
