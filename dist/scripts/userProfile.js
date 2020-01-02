"use strict";

//getting items stored into local storage during login and registration
var firstname = localStorage.getItem("firstname");
var token = localStorage.getItem('token');
var role = localStorage.getItem("role"); //preventing unauthorised users from accessing the page

if (!token) {
  window.location.href = './login.html';
} //handling logout


var logout = document.getElementById('logout');
logout.addEventListener('click', function () {
  localStorage.clear();
  window.location.href = './login.html';
});
document.querySelector("#nameBar").innerHTML = firstname.toUpperCase(); //fetch request to render all user parcels into the table

var userId = localStorage.getItem("userId");
fetch("http://localhost:3000/api/v1/users/".concat(userId, "/parcels"), {
  method: "GET",
  headers: {
    Authorization: token
  }
}).then(function (res) {
  return res.json();
}).then(function (data) {
  var ordersTable = document.querySelector(".parcelDetails");

  if (!data.length) {
    document.querySelector("#error-msg").innerHTML = "You do not have any Parcel Delivery Order yet";
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
    document.getElementById("ordersLength").innerHTML = "".concat(data.length); //Number of items in transit

    var transitOrders = data.filter(function (val) {
      return val.status === "in transit";
    }).length;
    document.getElementById("transit").innerHTML = "".concat(transitOrders); //number of delivered items

    var delivered = data.filter(function (val) {
      return val.status === "delivered";
    }).length;
    document.getElementById("delivered").innerHTML = "".concat(delivered); //number of cancelled items

    var cancelled = data.filter(function (val) {
      return val.status === "cancelled";
    }).length;
    document.getElementById("cancelled").innerHTML = "".concat(cancelled);
    var dest = document.createElement('h2');
    dest.className = 'destinationh2';
    dest.innerHTML = "<div class=\"top\"><a href=\"changedestination.html\" class=\"heya\"> Change Destination</a> </div>";
    document.getElementById('dassh').append(dest);
    var cancel = document.createElement('h2');
    cancel.className = 'destinationh2';
    cancel.innerHTML = "<div class=\"bottom\"><a href=\"cancelorder.html\" class=\"hey\"> Cancel Order</a></div>";
    document.getElementById('dassh').append(cancel);
  }
});
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});