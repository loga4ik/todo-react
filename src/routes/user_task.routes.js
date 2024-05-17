const Router = require("express").Router();

const { where } = require("sequelize");
const { user_task } = require("../db/models");

Router.get("/", async (req, res) => {
  try {
    const data = await user_task.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:aim_id", async (req, res) => {
  const aim_id = req.params.aim_id;

  try {
    const data = await user_task.findAll(
      { where: { aim_id: aim_id } }
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
    await user_task.update({ text: text }, { where: { id } });
    const data = await user_task.findAll({ where: { id } });
    res.json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create", async (req, res) => {
  //достаем данные из тела запроса,
  const aim_id = req.body.aim_id;
  const text = req.body.text;
  console.log(aim_id);
  try {
    const data = await user_task.create({ aim_id: aim_id, text: text });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await user_task.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
