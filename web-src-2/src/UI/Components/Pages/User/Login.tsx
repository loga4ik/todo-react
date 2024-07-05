import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../../store";
import { loginUser } from "../../../../Slices/userSlice/userSlice";
import { UserData } from "../../../../Slices/userSlice/userApi";
import { Wrapper } from "../../../UIKit/Wrapper";
import Input from "../../../UIKit/Inputs/Input";
import { Button } from "../../../UIKit/Inputs/Button";

export const Login = () => {
  const { error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<UserData>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const formOnSubmitHandler = (data: UserData) => {
    (async () => {
      const query = await dispatch(loginUser(data));
      query.meta.requestStatus === "fulfilled" && navigate("/");
    })();
  };

  return (
    <>
      {error}
      <div className="form-page">
        <Wrapper className="form-block ">
          <p className="form-title">войти</p>
          <form
            className="form-block_form"
            onSubmit={handleSubmit(formOnSubmitHandler)}
          >
            <Input
              className="form_input"
              inputType="text"
              placeholder="login"
              register={register("login")}
            />
            <Input
              className="form_input password_input"
              inputType="password"
              placeholder="password"
              register={register("password")}
            />
            <Button
              className={"form_submit_btn"}
              type="submit"
              onClick={handleSubmit(formOnSubmitHandler)}
            >
              отправить
            </Button>
          </form>
        </Wrapper>
      </div>
    </>
  );
};
