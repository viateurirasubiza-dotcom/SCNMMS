const API =
"http://127.0.0.1:5000";




async function register(){


let user={


fullname:
document.getElementById("fullname").value,


username:
document.getElementById("username").value,


password:
document.getElementById("password").value,


role:
document.getElementById("role").value


};





let response = await fetch(

API+"/register",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify(user)

}

);





let data =
await response.json();



alert(data.message);



if(data.success){


window.location.href="index.html";


}



}
