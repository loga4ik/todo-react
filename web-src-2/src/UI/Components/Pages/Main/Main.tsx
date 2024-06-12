import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import { AppDispatch, RootState } from "../../../../store";
import { userTodos } from "../../../../Slices/todoSlice/todoSlice";
import { getCookie } from "../../../../Slices/userSlice/userSlice";
import { TodoList } from "../../Blocks/Todo/TodoList/TodoList";
import { AimList } from "../../Blocks/Aims/AimList/AimList";

export const Main = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (!currentUser?.id) {
        const query = await dispatch(getCookie());
        if (!query.payload) {
          navigate("/login");
        }
      }
      currentUser && dispatch(userTodos({ userId: currentUser.id }));
    })();
  }, [currentUser, dispatch, navigate]);

  const redirectCreateAimClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    return navigate("/create-aim");
  };

  return (
    <div className="page">
      <button className="todoPage-link" onClick={redirectCreateAimClickHandler}>
        создать цель
      </button>
      <div className="pageWrapper">
        {currentUser?.login && <TodoList />}
        <div className="pageBlock">
          <AimList />
        </div>
      </div>
    </div>
  );
};
