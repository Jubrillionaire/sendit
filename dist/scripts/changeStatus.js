"use strict";

var token = localStorage.getItem("token");
var role = localStorage.getItem("role");

if (!token) {
  window.location.href = './login.html';
}

if (role !== "admin") {
  window.location = "./adminParcels.html";
}

var editStatus = function editStatus(event) {
  event.preventDefault();
  fetch("api/v1/parcels/status", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      parcelId: document.getElementById("parcelId").value,
      status: document.getElementById("status").value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    if (res.details) {
      window.location = "adminParcels.html";
      toastr.success("status changed successfully!");
    } else if (res.msg) {
      toastr.error(res.msg);
    }
  })["catch"](function (err) {
    return console.log("error occured", err);
  });
};

document.getElementById("edit-form").addEventListener("submit", editStatus);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});