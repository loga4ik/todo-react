import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import {
  switchActiveTodo,
  updateUserTodo,
} from "../../../../../Slices/todoSlice/todoSlice";
import { RenameInput } from "../../../../UiKit/RenameInput";
type TodoType = {
  id: number;
  text: string;
  is_active: boolean;
};
type Props = {
  todo: TodoType;
};
//memo - чтобы остальные todo не перерисовывались
export const TodoItem: React.FC<Props> = memo(({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <div className="listElement">
      <input
        type="checkbox"
        name="isActive"
        className="listElement_checkbox"
        checked={!todo.is_active}
        onChange={changeActiveCheckboxHadler}
      />
      {todo.id}. {todo.text}
      <RenameInput propsFunc={chengeTodoText} />
    </div>
  );
});
