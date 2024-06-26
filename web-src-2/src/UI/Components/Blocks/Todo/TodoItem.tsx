import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import "./Todo.css";
import {
  deleteUserTodo,
  switchActiveTodo,
  updateUserTodo,
} from "../../../../Slices/todoSlice/todoSlice";
import { RenameInput } from "../../../UIKit/RenameInput";
import useShowTime from "../../../../Hooks/useShowTime";
import { formatTime } from "../../../../scripts/formatTime";
type TodoType = {
  id: number;
  text: string;
  createdAt: Date;
  is_active: boolean;
};
type Props = {
  todo: TodoType;
};

//memo - чтобы остальные todo не перерисовывались
export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { startHover, endHover, isHovered } = useShowTime(() => {});

  const changeActiveCheckboxHadler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    dispatch(switchActiveTodo({ todoId: todo.id }));
  };
  const chengeTodoText = useCallback(
    (text: string) => {
      dispatch(updateUserTodo({ todo_id: todo.id, text }));
    },
    [dispatch, todo]
  );

  const deleteTodo = useCallback(() => {
    dispatch(deleteUserTodo({ todoId: todo.id }));
  }, [dispatch, todo.id]);

  return (
    <div className="listElement">
      <input
        type="checkbox"
        name="isActive"
        className="listElement_checkbox"
        checked={!todo.is_active}
        onChange={changeActiveCheckboxHadler}
      />
      <p>{todo.id}. </p>
      {!isOpen ? (
        <p onMouseEnter={startHover} onMouseLeave={endHover}>
          {todo.text}
        </p>
      ) : (
        <RenameInput
          propsFunc={chengeTodoText}
          text={todo.text}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          deleteTodo={deleteTodo}
        />
      )}
      {isHovered && (
        <span className="listElement_createdAt">
          {formatTime(todo.createdAt)}
        </span>
      )}
      {todo.is_active && (
        <button
          className={
            !isOpen ? "edit-element open_element" : "edit-element close_element"
          }
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </div>
  );
});
