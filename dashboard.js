// ======================================
// SCNMMS LIVE DASHBOARD API CLIENT
// ======================================


const API_URL = "http://127.0.0.1:5000";





// Load Dashboard Data

async function loadDashboard(){


try{


const response = await fetch(

API_URL + "/report"

);



const data = await response.json();





// Total Devices


let total =

document.getElementById(
"totalDevices"
);



if(total){

total.innerHTML =
data.total_devices;

}







// Online Devices


let online =

document.getElementById(
"onlineDevices"
);



if(online){

online.innerHTML =
data.online_devices;

}







// Offline Devices


let offline =

document.getElementById(
"offlineDevices"
);



if(offline){


offline.innerHTML =

data.total_devices -
data.online_devices;


}







// Alerts


let alerts =

document.getElementById(
"alerts"
);



if(alerts){


alerts.innerHTML =
data.alerts;


}







// Uptime display


let uptime =

document.getElementById(
"uptime"
);



if(uptime){

uptime.innerHTML =
data.network_uptime;

}







}

catch(error){


console.log(
"Dashboard API Error:",
error
);


}



}








// Auto update

setInterval(

loadDashboard,

5000

);






window.onload=function(){

loadDashboard();

};
