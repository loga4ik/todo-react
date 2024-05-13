const Router = require("express").Router();

const { where } = require("sequelize");
const { User_subtask } = require("../db/models");

Router.get("/", async (req, res) => {
  try {
    const data = await User_subtask.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:task_id", async (req, res) => {
  const task_id = req.params.task_id;

  try {
    const data = await User_subtask.findAll({ where: { task_id: task_id } });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/inactive/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User_todo.update(
      { is_active: false },
      { where: { id } }
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
    await User_subtask.update({ text: text }, { where: { id } });
    const data = await User_subtask.findAll({ where: { id } });
    res.json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create", async (req, res) => {
  //достаем данные из тела запроса,
  const task_id = req.body.task_id;
  const text = req.body.text;
  try {
    const data = await User_subtask.create({
      task_id: task_id,
      text: text,
      is_active: true,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User_subtask.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
