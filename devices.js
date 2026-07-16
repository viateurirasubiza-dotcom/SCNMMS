// ======================================
// SCNMMS DEVICE MANAGEMENT
// ======================================


// Load devices

let devices = JSON.parse(
    localStorage.getItem("devices")
) || [];





// Add Device Function

function addDevice(){


    let name =
    document.getElementById("deviceName").value;


    let ip =
    document.getElementById("ipAddress").value;


    let mac =
    document.getElementById("macAddress").value;


    let type =
    document.getElementById("deviceType").value;


    let building =
    document.getElementById("building").value;


    let room =
    document.getElementById("room").value;




    let device = {


        id: Date.now(),

        name:name,

        ip:ip,

        mac:mac,

        type:type,

        building:building,

        room:room,

        status:"Online"


    };



    devices.push(device);



    localStorage.setItem(
        "devices",
        JSON.stringify(devices)
    );



    alert("Device Added Successfully");



    displayDevices();


}






// Display Devices


function displayDevices(){


let table =
document.getElementById("deviceTable");



if(!table) return;



table.innerHTML="";



devices.forEach(device=>{


table.innerHTML += `

<tr>


<td>${device.name}</td>

<td>${device.ip}</td>

<td>${device.mac}</td>

<td>${device.type}</td>

<td>
${device.building}
/
${device.room}
</td>


<td class="online">

${device.status}

</td>



<td>


<button 
onclick="deleteDevice(${device.id})"
class="delete">

Delete

</button>


</td>


</tr>

`;



});



}








// Delete Device


function deleteDevice(id){



devices =
devices.filter(device =>
device.id !== id
);



localStorage.setItem(

"devices",

JSON.stringify(devices)

);



displayDevices();



}








// Search Device


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


let text =
row.innerText.toLowerCase();



if(text.includes(value)){


row.style.display="";


}


else{


row.style.display="none";


}



});



}







// Load automatically


window.onload=function(){

displayDevices();

};
