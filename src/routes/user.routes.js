const Router = require("express").Router();

const { where } = require("sequelize");
const { user } = require("../db/models");

Router.get("/", async (req, res) => {
  try {
    const data = await user.findAll({ raw: true });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await user.findAll({ where: { id: id } });
    // console.log(id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.put("/login/:id", async (req, res) => {
  //достаем данные из параметров запроса,
  const login = req.body.login;
  const password = req.body.password;
  // const { login, password } = req.body;
  const id = req.params.id;
  try {
    await user.update({ login: login, password: password }, { where: { id } });
    const data = await user.findAll({ where: { id } });
    res.json(...data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.post("/create", async (req, res) => {
  //достаем данные из тела запроса,
  const login = req.body.login;
  const password = req.body.password;
  console.log(login, password);
  try {
    const data = await user.create({ login: login, password: password });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await user.destroy({
      where: { id },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
