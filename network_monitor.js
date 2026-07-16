// ======================================
// SCNMMS NETWORK MONITORING ENGINE
// ======================================



// Load devices

function getDevices(){


return JSON.parse(

localStorage.getItem("devices")

) || [];


}






// Save devices

function saveDevices(devices){


localStorage.setItem(

"devices",

JSON.stringify(devices)

);


}








// Network Check Simulation


function checkNetwork(){



let devices = getDevices();





devices.forEach(device=>{



// simulate ping response

let random = Math.random();





if(random > 0.15){


device.status="Online";


}


else{


device.status="Offline";


createAlert(device);


}



});






saveDevices(devices);



console.log(
"Network scan completed"
);



}








// Create Alert


function createAlert(device){



let alerts = JSON.parse(

localStorage.getItem("alerts")

) || [];





let alert = {


id:Date.now(),


device:device.name,


message:
device.name +
" disconnected from network",


severity:"Critical",


time:
new Date().toLocaleString()



};





alerts.push(alert);





localStorage.setItem(

"alerts",

JSON.stringify(alerts)

);



}









// Run network check every 10 seconds


setInterval(

checkNetwork,

10000

);






window.onload=function(){


checkNetwork();


};
