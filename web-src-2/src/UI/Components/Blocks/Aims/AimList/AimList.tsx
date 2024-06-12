import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimList.css";
import { AppDispatch, RootState } from "../../../../../store";
import { userAims } from "../../../../../Slices/todoSlice/todoSlice";
import { Aim } from "./Aim";

export const AimList = memo(() => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const aimList = useSelector((state: RootState) => state.todo.aimList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(userAims({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  return (
    <div className="aimList">
      <p>цели</p>
      <div className="dropdown">
        {aimList?.map((aim) => (
          <Aim aim={aim} key={`aim${aim.id}`} />
        ))}
      </div>
    </div>
  );
});
