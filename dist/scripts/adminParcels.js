"use strict";

//getting items stored into local storage during login and registration
var firstname = localStorage.getItem("firstname");
var token = localStorage.getItem('token');
var role = localStorage.getItem("role");

if (!token) {
  window.location.href = './login.html';
}

if (role !== "admin") {
  window.location = "./userProfile.html";
} //handling logout


var logout = document.getElementById('logout');
logout.addEventListener('click', function () {
  localStorage.clear();
  window.location.href = './login.html';
});
document.querySelector("#nameBar").innerHTML = firstname.toUpperCase(); //fetch request to render all user parcels into the table

var userId = localStorage.getItem("userId");
fetch("api/v1/parcels", {
  method: "GET",
  headers: {
    Authorization: token
  }
}).then(function (res) {
  return res.json();
}).then(function (data) {
  var ordersTable = document.querySelector(".parcelDetails");

  if (!data.length) {
    document.querySelector("#error-msg").innerHTML = "No parcels in Database";
  } else {
    data.sort(function (a, b) {
      return a.id - b.id;
    }); // renderTableData(data, ordersTable);

    var renderTableData = function renderTableData(data, ordersTable) {
      data.forEach(function (parcel) {
        var parcelRow = document.createElement("tr");
        parcelRow.innerHTML = "<th scope=\"row\">".concat(parcel.id, "</th>\n                                <td>").concat(parcel.pickup_location, "</td>\n                                <td class=\"remove-second\">").concat(parcel.destination, "</td>\n                                <td>").concat(parcel.recipient_name, "</td>\n                                <td>").concat(parcel.recipient_phone_no, "</td>\n                                <td>").concat(parcel.status, "</td>\n                                 ");
        ordersTable.append(parcelRow);
      });
    };

    renderTableData(data, ordersTable);
    var dest = document.createElement('h2');
    dest.className = 'destinationh2';
    dest.innerHTML = "<div class=\"top\"><a href=\"changeStatus.html\" class=\"heya\">Change Status</a> </div>";
    document.getElementById('dassh').append(dest);
    var cancel = document.createElement('h2');
    cancel.className = 'destinationh2';
    cancel.innerHTML = "<div class=\"bottom\"><a href=\"changeLocation.html\" class=\"hey\"> Change Location</a></div>";
    document.getElementById('dassh').append(cancel);
  }
});
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});