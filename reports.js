// ======================================
// SCNMMS REPORT GENERATION SYSTEM
// ======================================



function getReportDevices(){


return JSON.parse(

localStorage.getItem("devices")

) || [];


}






function getReportAlerts(){


return JSON.parse(

localStorage.getItem("alerts")

) || [];


}







// Generate Network Report


function generateReport(){



let devices = getReportDevices();


let alerts = getReportAlerts();





let total = devices.length;



let online = devices.filter(device =>

device.status==="Online"

).length;





let offline = devices.filter(device =>

device.status==="Offline"

).length;







let uptime = 0;



if(total > 0){


uptime =

Math.round(

(online / total) * 100

);


}







let report = {



date:
new Date().toLocaleString(),



totalDevices:
total,



onlineDevices:
online,



offlineDevices:
offline,



networkUptime:
uptime + "%",



totalAlerts:
alerts.length



};







// Save report history


let history = JSON.parse(

localStorage.getItem("reports")

) || [];




history.push(report);



localStorage.setItem(

"reports",

JSON.stringify(history)

);





displayReport(report);



}









// Display Report


function displayReport(report){



let output =

document.getElementById(
"reportResult"
);



if(!output)
return;





output.innerHTML = `



<h3>
Latest Network Report
</h3>


<p>
Date:
${report.date}
</p>


<p>
Total Devices:
${report.totalDevices}
</p>



<p>
Online:
${report.onlineDevices}
</p>



<p>
Offline:
${report.offlineDevices}
</p>



<p>
Network Uptime:
${report.networkUptime}
</p>



<p>
Active Alerts:
${report.totalAlerts}
</p>



`;



}







// Load Last Report


function loadLastReport(){


let reports = JSON.parse(

localStorage.getItem("reports")

) || [];



if(reports.length > 0){


displayReport(

reports[reports.length-1]

);


}



}





window.onload=function(){


loadLastReport();


};
