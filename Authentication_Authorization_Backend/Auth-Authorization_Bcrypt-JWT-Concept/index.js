const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", function (req, res) {
  let token = jwt.sign({ email: "swapnil@example.com" }, "secret"); // "secret" is the secret key
  res.cookie("token", token);
  res.send("Done");
  // console.log(token);
});

app.get("/read", function (req, res) {
  // console.log(req.cookies.token);
  // find token data
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(3000);
