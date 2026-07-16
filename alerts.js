// ======================================
// SCNMMS ALERTS API CLIENT
// ======================================


const ALERT_API =
"http://127.0.0.1:5000";





// ==========================
// LOAD ALERTS
// ==========================


async function loadAlerts(){


try{


const response = await fetch(

ALERT_API + "/alerts"

);



const alerts = await response.json();



let table =

document.getElementById(
"alertTable"
);



if(!table)
return;



table.innerHTML="";





alerts.forEach(alert=>{


let color="";



if(alert.severity=="Critical"){

color="red";

}

else if(alert.severity=="Warning"){

color="orange";

}

else{

color="green";

}





table.innerHTML += `


<tr>


<td>
${alert.device}
</td>



<td>
${alert.message}
</td>



<td style="color:${color}">
${alert.severity}
</td>



<td>
${alert.time}
</td>



</tr>


`;



});



}

catch(error){


console.log(
"Alert API Error:",
error
);


}



}







// ==========================
// CLEAR ALERTS
// ==========================


async function clearAlerts(){



await fetch(

ALERT_API+"/alerts",

{

method:"DELETE"

}

);



alert(
"All alerts cleared"
);



loadAlerts();


}








// Auto refresh


setInterval(

loadAlerts,

5000

);





window.onload=function(){

loadAlerts();

};
