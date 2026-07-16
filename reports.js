// ======================================
// SCNMMS REPORT API CLIENT
// ======================================


const REPORT_API =
"http://127.0.0.1:5000";






// ==========================
// LOAD REPORT
// ==========================


async function loadReport(){


try{


const response = await fetch(

REPORT_API + "/report"

);



const report = await response.json();





let result =

document.getElementById(
"reportResult"
);



if(!result)
return;





result.innerHTML = `


<h2>
📊 Network Report
</h2>


<hr>


<p>
<b>Total Devices:</b>

${report.total_devices}

</p>



<p>
<b>Online Devices:</b>

${report.online_devices}

</p>



<p>
<b>Offline Devices:</b>

${

report.total_devices -
report.online_devices

}

</p>



<p>
<b>Network Uptime:</b>

${report.network_uptime}

</p>



<p>
<b>Active Alerts:</b>

${report.alerts}

</p>



<p>
<b>Generated:</b>

${report.generated}

</p>


`;



}

catch(error){


console.log(

"Report API Error:",

error

);


}



}







// Refresh Report

setInterval(

loadReport,

10000

);






window.onload=function(){

loadReport();

};
