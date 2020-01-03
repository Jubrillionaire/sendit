 //getting items stored into local storage during login and registration
const firstname = localStorage.getItem("firstname");
const token = localStorage.getItem('token');
const role = localStorage.getItem("role");

if(!token){
  window.location.href = './login.html';
}

if(role !== "admin"){
  window.location = "./userProfile.html"
}

//handling logout
const logout = document.getElementById('logout');

logout.addEventListener('click', function () {
  localStorage.clear();
  window.location.href = './login.html';
});


document.querySelector("#nameBar").innerHTML = firstname.toUpperCase();

//fetch request to render all user parcels into the table
const userId = localStorage.getItem("userId");
fetch("api/v1/parcels", {
  method: "GET",
  headers: {
    Authorization: token
  }
})
  .then(res => res.json())
  .then(data => {
    const ordersTable = document.querySelector(".parcelDetails");
    if (!data.length) {
      document.querySelector("#error-msg").innerHTML =
        "No parcels in Database";
    } else {
      data.sort((a, b) => a.id - b.id);
      // renderTableData(data, ordersTable);

      const renderTableData = (data, ordersTable) => {
        data.forEach(parcel => {
          let parcelRow = document.createElement("tr");
          parcelRow.innerHTML = `<th scope="row">${parcel.id}</th>
                                <td>${parcel.pickup_location}</td>
                                <td class="remove-second">${parcel.destination}</td>
                                <td>${parcel.recipient_name}</td>
                                <td>${parcel.recipient_phone_no}</td>
                                <td>${parcel.status}</td>
                                 `;
          ordersTable.append(parcelRow);
        });
      
      };

       renderTableData(data, ordersTable);



      const dest = document.createElement('h2');
      dest.className = ('destinationh2'); 
      dest.innerHTML = `<div class="top"><a href="changeStatus.html" class="heya">Change Status</a> </div>`;
      document.getElementById('dassh').append(dest);

      const cancel = document.createElement('h2');
      cancel.className = ('destinationh2');
      cancel.innerHTML = `<div class="bottom"><a href="changeLocation.html" class="hey"> Change Location</a></div>`;
      document.getElementById('dassh').append(cancel);
    }
  });


$(document).ready(function(){
  $(".hamburger-nav").on("click", function(){

  $(".first-ul").toggleClass("open");

  });
});
