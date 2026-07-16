// =====================================
// SCNMMS MAIN JAVASCRIPT
// Smart Campus Network Monitoring System
// =====================================


// Default users (prototype)

const users = [

    {
        username:"admin",
        password:"admin123",
        role:"Network Administrator"
    },


    {
        username:"technician",
        password:"tech123",
        role:"Network Technician"
    }

];





// LOGIN FUNCTION

function login(){


    let username =
    document.getElementById("username").value;


    let password =
    document.getElementById("password").value;



    let role =
    document.getElementById("role").value;



    let userFound = users.find(user =>

        user.username === username &&
        user.password === password

    );




    if(userFound){


        localStorage.setItem(
            "loggedUser",
            JSON.stringify(userFound)
        );


        alert(
        "Welcome " + userFound.role
        );


        window.location.href="dashboard.html";


    }


    else{


        alert(
        "Invalid username or password!"
        );


    }



}






// CHECK LOGIN STATUS

function checkLogin(){


let user =
localStorage.getItem("loggedUser");



if(!user){

window.location.href="index.html";

}


}







// LOGOUT

function logout(){


localStorage.removeItem(
"loggedUser"
);


window.location.href="index.html";


}






// SHOW CURRENT USER

function showUser(){


let data =
localStorage.getItem("loggedUser");



if(data){


let user =
JSON.parse(data);



let element =
document.getElementById("usernameDisplay");



if(element){

element.innerHTML =
user.role;

}



}



}
