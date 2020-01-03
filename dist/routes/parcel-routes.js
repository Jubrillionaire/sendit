"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _parcelController = require("../controllers/parcel-controller");

var _middlewares = require("../middlewares/middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json()); //Create a parcel delivery order

app.post("/parcels", _middlewares.authorizeUser, _parcelController.createParcel);
app.get("/parcels", _middlewares.authorizeUser, _parcelController.getParcels); // Fetch all parcel delivery orders by a specific user 

app.get("/users/:userId/parcels", _middlewares.authorizeUser, _parcelController.getAllParcels); //change destination of an order

app.patch("/parcels/destination", _middlewares.authorizeUser, _parcelController.changeDestination); //change the status of an order 

app.patch("/parcels/status", _middlewares.authorizeUser, _parcelController.changeStatus); //change the present location of an order

app.patch("/parcels/location", _middlewares.authorizeUser, _parcelController.changeLocation); //cancel parcel 

app.patch("/parcels/cancel", _middlewares.authorizeUser, _parcelController.cancelParcel);
var _default = app;
exports["default"] = _default;