const role = localStorage.getItem("role");

if(role === "member"){
  window.location.href = './userProfile.html';
}else if(role === "admin"){
  window.location.href = './adminParcels.html';
}

const register = event => {
  event.preventDefault();

  fetch('api/v1/users', {
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
  })
  .then(res => res.json())
    .then(res => {
      if (res.token){
        fetch('api/v1/me', {
          headers: {
            'Authorization': res.token,
          }
        }).then(res => res.json())
        
          .then(data => {
            if ((data.role === 'member') || (data.role === 'admin')) {
              localStorage.setItem('token', res.token);
              localStorage.setItem('userId', res.userId);
              localStorage.setItem('firstname', data.first_name);
              localStorage.setItem('role', data.role);
              {data.role === "member" ? (window.location.href = "./userProfile.html") : (window.location.href = "./adminParcels.html")}
             toastr.success("Account created successfully!")
            }
          })
          .catch(err => console.log('err occured', err));
      } else if (res.msg) {
        toastr.error("Email exists, please enter another");
      } else {
        res.errors.forEach(err => {
          toastr.error(`${err.param}: ${err.msg}`);
        });
      }
    }).catch(err => console.log('err occured', err));
}

document.getElementById('registration-form').addEventListener ('submit', register);


$(document).ready(function(){
  $(".hamburger-nav").on("click", function(){

  $(".first-ul").toggleClass("open");

  });
});  
