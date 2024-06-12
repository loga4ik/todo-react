const Router = require("express").Router();

const { where } = require("sequelize");
const { user, user_todo } = require("../db/models");
// const user_todo = require("../../db/models/user_todo");

Router.get("/", async (req, res) => {
  try {
    const data = await user_todo.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const data = await user_todo.findAll({ where: { user_id: user_id } });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create", async (req, res) => {
  //достаем данные из тела запроса,
  const user_id = req.body.user_id;
  const text = req.body.text;
  // console.log(login, password);
  try {
    const data = await user_todo.create({ user_id: user_id, text: text });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  try {
    await user_todo.update({ text: text }, { where: { id } });
    const data = await user_todo.findOne({ where: { id } });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//переписать на измненение
Router.get("/inactive/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todoItem = await user_todo.findOne({ where: { id } });
    if (!todoItem) {
      return res.status(404).json({ error: "Todo item not found" });
    }
    const newStatus = !todoItem.is_active;
    await user_todo.update({ is_active: newStatus }, { where: { id } });
    const data = await user_todo.findOne({ where: { id } });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await user_todo.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
