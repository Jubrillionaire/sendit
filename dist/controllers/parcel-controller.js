"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelParcel = exports.changeLocation = exports.changeStatus = exports.changeDestination = exports.getParcels = exports.getAllParcels = exports.createParcel = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _check = require("express-validator/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json()); //========================CREATE PARCEL CONTROLLER=================================

var createParcel = function createParcel(req, res) {
  var _req$body = req.body,
      user_id = _req$body.user_id,
      pickup_location = _req$body.pickup_location,
      destination = _req$body.destination,
      recipient_name = _req$body.recipient_name,
      recipient_phone_no = _req$body.recipient_phone_no;
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  } else if (req.decoded.id === parseInt(user_id, 10)) {
    client.query('INSERT INTO parcels (user_id, pickup_location, destination, recipient_name, recipient_phone_no) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, pickup_location, destination, recipient_name, recipient_phone_no], function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          success: true,
          msg: 'Parcel created successfully!',
          id: result.rows[0].id
        });
      }
    });
  } else {
    res.status(401).send({
      msg: 'Sorry you can not create Parcel Order for another User!'
    });
  }
}; //get all parcels by a specific user


exports.createParcel = createParcel;

var getAllParcels = function getAllParcels(req, res) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: errors.array()
    });
  } else {
    var userId = parseInt(req.params.userId, 10);

    if (req.decoded.id === userId) {
      client.query("SELECT * FROM parcels WHERE user_id = ".concat(userId), function (err, resp) {
        if (err) {
          res.send(err);
        } else if (!resp.rows.length) {
          res.status(404).send({
            msg: 'You do not have any parcel order yet'
          });
        } else {
          res.send(resp.rows);
        }
      });
    } else {
      res.status(401).send({
        msg: 'Sorry you can not fetch Parcels for another User!'
      });
    }
  }
};

exports.getAllParcels = getAllParcels;

var getParcels = function getParcels(req, res) {
  if (req.decoded.role !== 'admin') {
    res.send({
      msg: 'failed! Only admins can access this endpoint'
    });
  } else {
    client.query("SELECT * FROM parcels", function (err, resp) {
      if (err) {
        console.log("sorry cant fetch data");
      } else {
        res.send(resp.rows);
      }
    });
  }
};

exports.getParcels = getParcels;

var changeDestination = function changeDestination(req, res) {
  var _req$body2 = req.body,
      parcelId = _req$body2.parcelId,
      destination = _req$body2.destination,
      user_id = _req$body2.user_id;

  if (req.decoded.id === parseInt(user_id, 10)) {
    client.query("UPDATE parcels SET destination = $2 WHERE id = $1 AND user_id = $3 RETURNING *", [parcelId, destination, user_id], function (err, results) {
      if (err) {
        res.send(err);
      } else if (!results.rows[0]) {
        res.send({
          msg: "you can not change Destination for another User!"
        });
      } else {
        res.send({
          success: true,
          msg: "Destination changed successfully",
          details: results.rows[0]
        });
      }
    });
  } else {
    res.send("Sorry! You can't change the destination for another user's parcel");
  }
};

exports.changeDestination = changeDestination;

var changeStatus = function changeStatus(req, res) {
  var _req$body3 = req.body,
      status = _req$body3.status,
      parcelId = _req$body3.parcelId;

  if (req.decoded.role !== 'admin') {
    res.send({
      msg: 'failed! Only admins can access this endpoint'
    });
  } else {
    client.query('UPDATE Parcels SET status = $1 WHERE id = $2 RETURNING *', [status, parcelId], function (err, results) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          msg: 'status changed successfully',
          details: results.rows[0]
        });
      }
    });
  }
};

exports.changeStatus = changeStatus;

var changeLocation = function changeLocation(req, res) {
  var _req$body4 = req.body,
      presentLocation = _req$body4.presentLocation,
      parcelId = _req$body4.parcelId;

  if (req.decoded.role !== 'admin') {
    res.send("only admins can change the present location");
  } else {
    client.query("UPDATE parcels SET pickup_location = $1 WHERE id = $2 RETURNING *", [presentLocation, parcelId], function (err, updatedLocation) {
      if (err) {
        console.log(err);
      } else {
        res.send({
          msg: "location updated successfully!!!",
          details: updatedLocation.rows[0]
        });
      }
    });
  }
};

exports.changeLocation = changeLocation;

var cancelParcel = function cancelParcel(req, res) {
  var _req$body5 = req.body,
      parcelId = _req$body5.parcelId,
      user_id = _req$body5.user_id;

  if (req.decoded.id === parseInt(user_id, 10)) {
    client.query("UPDATE parcels SET status = 'cancelled' WHERE id = $1 AND user_id = $2 RETURNING *", [parcelId, user_id], function (err, results) {
      if (err) {
        res.send(err);
        console.log(err);
      } else if (!results.rows[0]) {
        res.send({
          msg: "you can not cancel another user's parcel"
        });
      } else {
        res.send({
          success: true,
          msg: "parcel cancelled successfully",
          details: results.rows[0]
        });
      }
    });
  } else {
    res.send("Sorry! You can't cancel parcel for another user");
  }
};

exports.cancelParcel = cancelParcel;