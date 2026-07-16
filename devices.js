// ======================================
// SCNMMS DEVICE MANAGEMENT API CLIENT
// ======================================


const API = "http://127.0.0.1:5000";




// ==========================
// LOAD DEVICES
// ==========================

async function loadDevices(){


    const response = await fetch(
        API + "/devices"
    );


    const devices = await response.json();


    let table =
    document.getElementById(
        "deviceTable"
    );


    table.innerHTML="";



    devices.forEach(device=>{


        table.innerHTML += `

        <tr>

        <td>
        ${device.name}
        </td>


        <td>
        ${device.ip}
        </td>


        <td>
        ${device.mac}
        </td>


        <td>
        ${device.device_type}
        </td>


        <td>
        ${device.location}
        </td>


        <td class="${device.status}">
        ${device.status}
        </td>



        <td>

        <button
        class="delete"
        onclick="deleteDevice(${device.id})">

        Delete

        </button>

        </td>


        </tr>

        `;


    });


}







// ==========================
// ADD DEVICE
// ==========================


async function addDevice(){



let device={


name:
document.getElementById(
"deviceName"
).value,


ip:
document.getElementById(
"ipAddress"
).value,


mac:
document.getElementById(
"macAddress"
).value,


device_type:
document.getElementById(
"deviceType"
).value,


location:

document.getElementById(
"building"
).value
+
" "
+
document.getElementById(
"room"
).value



};





await fetch(

API+"/devices",

{

method:"POST",


headers:{

"Content-Type":
"application/json"

},


body:

JSON.stringify(device)


}

);




alert(
"Device Added"
);



loadDevices();


}








// ==========================
// DELETE DEVICE
// ==========================


async function deleteDevice(id){



await fetch(

API+"/devices/"+id,

{

method:"DELETE"

}

);




loadDevices();


}







// Search

function searchDevice(){


let value =

document
.getElementById("search")
.value
.toLowerCase();




let rows =

document
.querySelectorAll("#deviceTable tr");



rows.forEach(row=>{


if(
row.innerText
.toLowerCase()
.includes(value)

)

{

row.style.display="";

}

else{

row.style.display="none";

}


});


}








window.onload=function(){

loadDevices();

};
