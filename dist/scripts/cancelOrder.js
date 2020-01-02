"use strict";

var firstname = localStorage.getItem("firstname");
var userId = localStorage.getItem("userId");
var token = localStorage.getItem('token'); //preventing unauthorised users from accessing the page

if (!token) {
  window.location.href = './login.html';
}

document.querySelector("#nameBar").innerHTML = firstname.toUpperCase(); //handling request to cancel a specific parcel delivery order

var cancelOrder = function cancelOrder(event) {
  event.preventDefault();
  fetch("http://localhost:3000/api/v1/parcels/cancel", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      parcelId: document.getElementById("parcelId").value,
      user_id: userId
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    if (res.details) {
      toastr.success("Parcel Order cancelled successfully");
      window.location.href = "./userProfile.html";
    } else if (res.msg) {
      toastr.error(res.msg);
    }
  })["catch"](function (err) {
    return console.log("error occured", err);
  });
};

document.getElementById("edit-form").addEventListener("submit", cancelOrder);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});