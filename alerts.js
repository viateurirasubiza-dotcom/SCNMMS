// ======================================
// SCNMMS ALERT MANAGEMENT SYSTEM
// ======================================



// Get alerts

function getAlerts(){


return JSON.parse(

localStorage.getItem("alerts")

) || [];


}






// Display alerts


function displayAlerts(){



let alerts = getAlerts();



let table =

document.getElementById(
"alertTable"
);



if(!table) return;



table.innerHTML="";





alerts.reverse().forEach(alert=>{



let color="";



if(alert.severity==="Critical"){

color="red";

}

else if(alert.severity==="Warning"){

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


<td>

<button 
onclick="deleteAlert(${alert.id})">

Clear

</button>


</td>


</tr>



`;




});



}








// Delete one alert


function deleteAlert(id){



let alerts=getAlerts();



alerts = alerts.filter(alert =>

alert.id !== id

);




localStorage.setItem(

"alerts",

JSON.stringify(alerts)

);



displayAlerts();


}







// Clear all alerts


function clearAlerts(){



localStorage.removeItem(
"alerts"
);



displayAlerts();



alert(
"All alerts cleared"
);


}








// Count alerts


function alertCount(){


return getAlerts().length;


}








window.onload=function(){

displayAlerts();

};
