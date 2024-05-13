require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const cors = require('cors');
const userRouter = require("./routes/user.routes");
const userTodoRouter = require("./routes/user_todo.routes");
const userAimRouter = require("./routes/user_aim.routes");
const userTaskRouter = require("./routes/user_task.routes");
const userSubtaskRouter = require("./routes/user_subtask.routes");

const app = express();
const PORT = process.env.PORT ?? 3001;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Разрешаем доступ только с этого origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Разрешаем методы запроса
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Разрешаем определенные заголовки
  next();
});
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/user_todo", userTodoRouter);
app.use("/api/user_aim", userAimRouter);
app.use("/api/user_task", userTaskRouter);
app.use("/api/user_subtask", userSubtaskRouter);

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});
