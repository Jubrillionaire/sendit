"use strict";

var register = function register(event) {
  event.preventDefault();
  fetch('https://send-it-parcel.herokuapp.com/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      first_name: document.getElementById('firstname').value,
      last_name: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      phone_no: document.getElementById('phone-no').value,
      password: document.getElementById('password').value
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    if (res.token) {
      fetch('https://send-it-parcel.herokuapp.com/api/v1/me', {
        headers: {
          'Authorization': res.token
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.role === 'member' || data.role === 'admin') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('firstname', data.first_name);
          window.location.href = "./userProfile.html";
          toastr.success("Account created successfully!");
        }
      })["catch"](function (err) {
        return console.log('err occured', err);
      });
    } else if (res.msg) {
      toastr.error("Email exists, please enter another");
    } else {
      res.errors.forEach(function (err) {
        toastr.error("".concat(err.param, ": ").concat(err.msg));
      });
    }
  })["catch"](function (err) {
    return console.log('err occured', err);
  });
};

document.getElementById('registration-form').addEventListener('submit', register);
$(document).ready(function () {
  $(".hamburger-nav").on("click", function () {
    $(".first-ul").toggleClass("open");
  });
});