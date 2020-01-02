"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.userLogin = exports.createUser = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _check = require("express-validator/check");

var _middlewares = require("../middlewares/middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//============================CREATE USER ===================================================
var createUser = function createUser(req, res) {
  var _req$body = req.body,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      email = _req$body.email,
      phone_no = _req$body.phone_no,
      password = _req$body.password;
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  } else {
    client.query("INSERT INTO users (first_name, last_name, email, phone_no, password) VALUES($1, $2, $3, $4, $5) RETURNING *", [first_name, last_name, email, phone_no, password], function (err, user) {
      if (err) {
        res.send({
          msg: err.detail
        });
      } else {
        (0, _middlewares.tokenGenerator)(user.rows[0], function (err, token) {
          if (err) {
            res.send("unable to encode token");
          } else {
            res.status(201).send({
              success: true,
              msg: "Registered successfully!",
              userId: user.rows[0].id,
              token: token,
              expiresIn: "24hours"
            });
          }
        });
      }
    });
  }
}; //==================================USER LOGIN  =====================================================


exports.createUser = createUser;

var userLogin = function userLogin(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  client.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password], function (err, user) {
    if (err) {
      res.send(err);
    } else if (user.rows.length) {
      (0, _middlewares.tokenGenerator)(user.rows[0], function (err, token) {
        if (err) {
          res.send({
            msg: "Unable to encode token"
          });
        } else {
          res.send({
            msg: "Login successful",
            userId: user.rows[0].id,
            token: token,
            expiresIn: "24hours"
          });
        }
      });
    } else {
      res.send({
        success: false,
        msg: "Incorrect email or password"
      });
    }
  });
}; //GET USER


exports.userLogin = userLogin;

var getUser = function getUser(req, res) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()
    });
  } else {
    client.query("SELECT * FROM users WHERE id = ".concat(req.decoded.id), function (err, resp) {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(resp.rows[0]);
        res.status(200).send(resp.rows[0]);
      }
    });
  }
};

exports.getUser = getUser;