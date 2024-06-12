import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AimType } from "../../../../../Types/AimListTypes";
import { AppDispatch, RootState } from "../../../../../store";
import { userTasksAndSubtasks } from "../../../../../Slices/todoSlice/todoSlice";
import { TaskList } from "../Tasks/TaskList";

type Props = {
  aim: AimType;
};

export const Aim: React.FC<Props> = memo(({ aim }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const taskList = useSelector((state: RootState) => state.todo.taskList);

  const tasks = useMemo(
    () => taskList?.filter((task) => task.aim_id === aim.id),
    [taskList, aim.id]
  );

  useEffect(() => {
    if (aim?.id) {
      dispatch(userTasksAndSubtasks({ aimId: aim.id }));
    }
  }, [aim, dispatch]);

  // useEffect(() => {
  //   console.log(taskList);
  // }, [taskList]);

  return (
    <div>
      <div
        className="dropdown-toggle"
        onClick={() => tasks && tasks[0] && setIsOpen(!isOpen)}
      >
        {aim.text}
        {tasks && tasks[0] && (
          <i
            className={`arrow fi-rr-angle-left ${isOpen ? "open" : "close"}`}
          ></i>
        )}
      </div>

      {isOpen &&
        tasks?.map((task) => <TaskList task={task} key={`task${task.id}`} />)}
    </div>
  );
});