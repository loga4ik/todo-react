const Router = require("express").Router();

const { where } = require("sequelize");
const { User_aim, User_task, User_subtask } = require("../db/models");

Router.get("/", async (req, res) => {
  try {
    const data = await User_aim.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const data = await User_aim.findAll(
      // { raw: true },
      { where: { user_id: user_id } }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.put("/update/:id", async (req, res) => {
  //достаем данные из параметров запроса,
  const id = req.params.id;
  const text = req.body.text;

  try {
    await User_aim.update({ text: text }, { where: { id } });
    const data = await User_aim.findAll({ where: { id } });
    res.json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create", async (req, res) => {
  //достаем данные из тела запроса,
  const user_id = req.body.user_id;
  const text = req.body.text;
  try {
    const data = await User_aim.create({ user_id: user_id, text: text });
    res.json(data);
    // const new_data = await User_task.create({ user_id: user_id, text: text });
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create-list", async (req, res) => {
  //достаем данные из тела запроса,
  const { user_id, aim_text } = req.body;
  const taskList = req.body.tasks ? [...req.body.tasks] : null;

  try {
    const aimRes = await User_aim.create({ user_id: user_id, text: aim_text });
    finalRes = { ...aimRes.dataValues, taskArr: [] };
    for (const task of taskList) {
      const taskRes = await User_task.create({
        aim_id: aimRes.id,
        text: task.text,
      });
      const subtaskList = task.subtasks ? task.subtasks : null;
      console.log(subtaskList);
      const taskTempRes = { ...taskRes.dataValues, subtaskArr: [] };
      for (const subtask of subtaskList) {
        const subtaskRes = await User_subtask.create({
          task_id: taskRes.dataValues.id,
          text: subtask.text,
        });
        console.log(taskTempRes);
        taskTempRes.subtaskArr.push(subtaskRes.dataValues);
      }
      finalRes.taskArr.push(taskTempRes);
    }
    res.json(finalRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User_aim.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
