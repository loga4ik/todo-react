const Router = require("express").Router();

const { where } = require("sequelize");
const { User, User_todo } = require("../db/models");
// const User_todo = require("../../db/models/User_todo");

Router.get("/", async (req, res) => {
  try {
    const data = await User_todo.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    console.log(user_id);
    const data = await User_todo.findAll(
      { where: { user_id: user_id } }
    );
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
    const data = await User_todo.create({ user_id: user_id, text: text });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  try {
    const data = await User_todo.update({ text: text }, { where: { id } });
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

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User_todo.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
