import "./MainPage.css";
import { TodoList } from "../../Blocks/Todo/TodoList/TodoList";
import { AimList } from "../../Blocks/Aims/AimList/AimList";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../../../Slices/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      (async () => {
        const query = await dispatch(getCookie());
        !query.payload && navigate("login");
      })();
    }
  }, [currentUser, navigate, dispatch]);

  return (
    <div className="pageWrapper">
      {currentUser && <TodoList currentUser={currentUser}/>}
      <div className="pageBlock">
        <AimList />
      </div>
    </div>
  );
};
