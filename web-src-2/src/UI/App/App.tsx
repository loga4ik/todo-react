import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../Components/Pages/Main/Main";
import { Register } from "../Components/Pages/User/Register";
import { Login } from "../Components/Pages/User/Login";
import { AimForm } from "../Components/Blocks/Aims/aimForm/AimForm";

function App() {
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   // dispatch(setAllTodoDefault());
  //   return () => {
  //     dispatch(setAllTodoDefault());
  //   };
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/todo" element={<TodoList />} /> */}
        <Route path="/create-aim" element={<AimForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
