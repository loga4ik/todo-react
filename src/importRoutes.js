const express = require("express");
const userRouter = require("./routes/user.routes");
const userTodoRouter = require("./routes/user_todo.routes");
const userAimRouter = require("./routes/user_aim.routes");
const userTaskRouter = require("./routes/user_task.routes");
const userSubtaskRouter = require("./routes/user_subtask.routes");

const router = express.Router();

router.use("/user", userRouter);
router.use("/user_todo", userTodoRouter);
router.use("/user_aim", userAimRouter);
router.use("/user_task", userTaskRouter);
router.use("/user_subtask", userSubtaskRouter);

module.exports = router;