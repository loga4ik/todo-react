const Router = require("express").Router();

const { where } = require("sequelize");
const { user } = require("../db/models");
const bcrypt = require("bcryptjs");

const comparePassword = async ({ possiblePassword, hashedPassword }) => {
  // return { possiblePassword, hashedPassword };
  return await bcrypt.compare(possiblePassword, hashedPassword);
};

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

Router.post("/login", async (req, res) => {
  //достаем данные из параметров запроса,
  const { login, password } = req.body;
  // console.log(login);
  // const { login, password } = req.body;
  // const id = req.params.id;
  try {
    const currentUser = await user.findOne({ where: { login } });
    // console.log(password);
    const isMatch = await comparePassword({
      possiblePassword: password,
      hashedPassword: currentUser.password,
    });
    // console.log(isMatch);
    if (!currentUser || !isMatch) {
      return res.status(401).send("invalid password or login").json();
    } else {
      res.json(currentUser);
    }
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
    res.status(500).json(err);

    // const data = await user.create({ login: login, password: password });
    // res.json(data);
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
