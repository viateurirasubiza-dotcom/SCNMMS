// ======================================
// SCNMMS DASHBOARD SYSTEM
// ======================================


// Get Devices

function loadDashboard(){


let devices = JSON.parse(

localStorage.getItem("devices")

) || [];





// Total devices

let total =
devices.length;





// Online devices

let online =

devices.filter(device =>

device.status === "Online"

).length;





// Offline devices

let offline =

devices.filter(device =>

device.status === "Offline"

).length;







// Alerts simulation

let alerts = offline;







// Display values


let totalBox =
document.getElementById("totalDevices");


let onlineBox =
document.getElementById("onlineDevices");


let offlineBox =
document.getElementById("offlineDevices");


let alertBox =
document.getElementById("alerts");




if(totalBox)

totalBox.innerHTML = total;



if(onlineBox)

onlineBox.innerHTML = online;



if(offlineBox)

offlineBox.innerHTML = offline;



if(alertBox)

alertBox.innerHTML = alerts;



}







// Auto refresh every 5 seconds


setInterval(

loadDashboard,

5000

);





window.onload=function(){

loadDashboard();

};
