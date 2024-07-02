import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimList.css";
import { AppDispatch, RootState } from "../../../../../store";
import { userAims } from "../../../../../Slices/todoSlice/todoSlice";
import { Aim } from "./Aim";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../../../Hooks/useThemeContext";

export const AimList = memo(() => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const aimList = useSelector((state: RootState) => state.todo.aimList);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(userAims({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const redirectCreateAimClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    return navigate("/create-aim");
  };

  return (
    <div className={`pageBlock aimList ${theme === 'dark' && "dark_in_big"}`}>
      <p className={`${theme === 'dark' && "text_dark"}`}>цели</p>
      <button className={`todoPage-link ${theme === 'dark' && "dark_out_small text_dark"}`} onClick={redirectCreateAimClickHandler}>
        создать
      </button>
      <div className="dropdown">
        {aimList?.map((aim) => (
          <Aim aim={aim} key={`aim${aim.id}`} />
        ))}
      </div>
    </div>
  );
});
