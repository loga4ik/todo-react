const session = require("express-session");
const FileStore = require("session-file-store")(session);

const sessionConfig = {
  store: new FileStore(),
  name: "user_id",
  secret: "asd",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60*12, //1 час
    // maxAge: 1000 * 30, //30 секунд
    httpOnly: true,
  },
};
module.exports = sessionConfig;
