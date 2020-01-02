const firstname = localStorage.getItem("firstname");
const userId = localStorage.getItem("userId");
const token = localStorage.getItem('token');

//preventing unauthorised users from accessing the page
if(!token){
  window.location.href = './login.html';
}

document.querySelector("#nameBar").innerHTML = firstname.toUpperCase();

//handling request to change a specific parcel destination
const changeDestination = event => {
  event.preventDefault();

  fetch("/api/v1/parcels/destination", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      parcelId: document.getElementById("parcelId").value,
      destination: document.getElementById("destination").value,
      user_id: userId
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.details) {
        toastr.success("Destination changed successfully!");
        window.location.href = "./userProfile.html";
      } else if (res.msg) {
        toastr.error(res.msg);
      }
    })
    .catch(err => console.log("error occured", err));
};

document
  .getElementById("edit-form")
  .addEventListener("submit", changeDestination);


  $(document).ready(function(){
    $(".hamburger-nav").on("click", function(){
  
    $(".first-ul").toggleClass("open");
  
    });
  });
