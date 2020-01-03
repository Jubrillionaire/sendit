"use strict";

var role = localStorage.getItem("role");

if (role === "member") {
  window.location.href = './userProfile.html';
} else if (role === "admin") {
  window.location.href = './adminParcels.html';
}

var login = function login(event) {
  event.preventDefault();
  fetch('api/v1/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    if (res.token) {
      fetch('api/v1/me', {
        headers: {
          'Authorization': res.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        console.log("coming from login", data);

        if (data.role === 'member' || data.role === 'admin') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('firstname', data.first_name);
          localStorage.setItem('role', data.role);
          {
            data.role === "member" ? window.location.href = "./userProfile.html" : window.location.href = "./adminParcels.html";
          }
          toastr.success("logged in successfully!");
        } else {
          toastr.error('Sorry, only a MEMBER can log in to this page');
        }
      })["catch"](function (err) {
        return console.log('err occured', err);
      });
    } else if (res.msg) {
      toastr.error(res.msg);
    }
  })["catch"](function (err) {
    return console.log('err occured', err);
  });
};

document.getElementById('login-form').addEventListener('submit', login);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});