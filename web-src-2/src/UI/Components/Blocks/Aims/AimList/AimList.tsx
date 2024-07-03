import { BaseSyntheticEvent, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aimList.css";
import { AppDispatch, RootState } from "../../../../../store";
import { userAims } from "../../../../../Slices/todoSlice/todoSlice";
import { Aim } from "./Aim";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../../../UIKit/Wrapper";
import { Input } from "../../../../UIKit/Input";

export const AimList = memo(() => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const aimList = useSelector((state: RootState) => state.todo.aimList);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(userAims({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  const redirectCreateAimClickHandler = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    return navigate("/create-aim");
  };

  return (
    <Wrapper className="pageBlock aimList">
      <p>цели</p>
      <Input
        inputType="btn"
        className="todoPage-link"
        onClick={redirectCreateAimClickHandler}
      >
        создать
      </Input>
      <div className="dropdown">
        {aimList?.map((aim) => (
          <Aim aim={aim} key={`aim${aim.id}`} />
        ))}
      </div>
    </Wrapper>
  );
});
