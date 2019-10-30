const userId = localStorage.getItem("userId");
const firstname = localStorage.getItem("firstname");
const token = localStorage.getItem('token');

//preventing unauthorised users from accessing the page
if(!token){
  window.location.href = './login.html';
}

document.querySelector("#nameBar").innerHTML = firstname.toUpperCase();

const createOrder = event => {
  event.preventDefault();
 fetch("/api/v1/parcels", {
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
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.id) {
        alert("parcel created successfully!");
        window.location.href = "./userProfile.html";
      } else if (res.msg) {
        toastr.error(res.msg);
      } else {
        res.errors.forEach(err => {
          toastr.error(err.msg);
        });
      }
    })
    .catch(err => console.log("error occured", err));
};

document.getElementById("registration-form").addEventListener("submit", createOrder);

  
