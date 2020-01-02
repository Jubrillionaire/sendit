"use strict";

var userId = localStorage.getItem("userId");
var firstname = localStorage.getItem("firstname");
var token = localStorage.getItem('token'); //preventing unauthorised users from accessing the page

if (!token) {
  window.location.href = './login.html';
}

document.querySelector("#nameBar").innerHTML = firstname.toUpperCase();

var createOrder = function createOrder(event) {
  event.preventDefault();
  fetch("https://send-it-parcel.herokuapp.com/api/v1/parcels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      user_id: userId,
      pickup_location: document.getElementById("pickup").value,
      destination: document.getElementById("destination").value,
      recipient_name: document.getElementById("reciName").value,
      recipient_phone_no: document.getElementById("reciNum").value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    if (res.id) {
      window.location.href = "./userProfile.html";
      toastr.success("parcel created successfully!");
    } else if (res.msg) {
      toastr.error(res.msg);
    } else {
      res.errors.forEach(function (err) {
        toastr.error(err.msg);
      });
    }
  })["catch"](function (err) {
    return console.log("error occured", err);
  });
};

document.getElementById("registration-form").addEventListener("submit", createOrder);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});