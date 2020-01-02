"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _check = require("express-validator/check");

var _middlewares = require("../middlewares/middlewares.js");

var _userController = require("../controllers/user-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json()); //creating user's account

app.post("/users", [(0, _check.check)('first_name').isAlpha().withMessage('first name should be in alphabets only').isLength({
  min: 5,
  max: 15
}).withMessage('first name must be of 5 characters and above'), (0, _check.check)('email', 'email must be valid').isEmail(), (0, _check.check)('phone_no', 'Mobile number must be valid').isMobilePhone(), (0, _check.check)('password').isLength({
  min: 5
}).withMessage('Password must have a minimum length of 5')], _userController.createUser); //login endpoint

app.post("/users/login", _userController.userLogin); //user details endpoint

app.get("/me", _middlewares.authorizeUser, _userController.getUser);
var _default = app;
exports["default"] = _default;