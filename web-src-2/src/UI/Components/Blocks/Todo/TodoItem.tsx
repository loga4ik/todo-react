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
import { Input } from "../../../UIKit/Input";
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
        <p className="listElement_createdAt">{formatTime(todo.createdAt)}</p>
      )}
      {todo.is_active && (
        <Input
          inputType="btn"
          className="edit-element"
          changableIconClass={`${!isOpen ? "open_element" : "close_element"}`}
          //отправлять класс с флагом в кастомный инпут

          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </div>
  );
});
