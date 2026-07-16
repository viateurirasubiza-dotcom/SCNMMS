const API =
"http://127.0.0.1:5000";





async function resetPassword(){



let username =
document.getElementById(
"username"
).value;



let password =
document.getElementById(
"newPassword"
).value;





let response = await fetch(

API+"/forgot-password",

{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

username:username,

password:password

})


}

);





let data =
await response.json();



alert(data.message);



if(data.success){

window.location.href="index.html";

}


}
