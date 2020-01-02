"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _middlewares = require("./middlewares/middlewares");

var createUser = function createUser() {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      email = _req$body.email,
      password = _req$body.password;

  if (err) {
    console.log(err);
  } else {
    client.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$@, $3, $4, $5) RETURNING *"[(firstname, lastname, email, password)], function (err, token) {
      if (err) {
        res.send('sorry unable to create user');
      } else {
        (0, _middlewares.tokenGenerator)(user.rows[0], function (err, token) {
          if (err) {
            console.log('unable to generate token');
          } else {
            res.send({
              token: token,
              msg: "registered successfully",
              id: user.rows[0].id
            });
          }
        });
      }
    });
  }
};

exports.createUser = createUser;