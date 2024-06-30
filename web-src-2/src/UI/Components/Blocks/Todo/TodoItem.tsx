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
import { useThemeContext } from "../../../../Hooks/useThemeContext";
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
  const { isDark } = useThemeContext();

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
      <p className={`${isDark && "text_dark"}`}>{todo.id}. </p>
      {!isOpen ? (
        <p
          className={`${isDark && "text_dark"}`}
          onMouseEnter={startHover}
          onMouseLeave={endHover}
        >
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
        <p className={`listElement_createdAt ${isDark && "text_dark"}`}>
          {formatTime(todo.createdAt)}
        </p>
      )}
      {todo.is_active && (
        <button
          className={`edit-element ${
            isDark ? "dark_out_smaill" : "light_out_small"
          } ${
            !isOpen
              ? isDark
                ? "open_element_dark"
                : "open_element"
              : isDark
              ? "close_element_dark"
              : "close_element"
          } `}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </div>
  );
});
