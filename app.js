// =====================================
// SCNMMS MAIN JAVASCRIPT
// Smart Campus Network Monitoring System
// =====================================


// ===============================
// DEFAULT USERS
// ===============================

const defaultUsers = [

    {
        username: "admin",
        password: "admin123",
        role: "Network Administrator",
        fullname: "System Administrator"
    },

    {
        username: "technician",
        password: "tech123",
        role: "Network Technician",
        fullname: "Network Technician"
    }

];



// ===============================
// LOGIN FUNCTION
// ===============================

function login() {

    let username = document.getElementById("username").value.trim();

    let password = document.getElementById("password").value.trim();

    let role = document.getElementById("role").value;


    if (username === "" || password === "") {

        alert("Please enter Username and Password.");

        return;

    }


    // Users created from Register page
    let registeredUsers =
        JSON.parse(localStorage.getItem("users")) || [];


    // Combine default users + registered users
    let allUsers = [...defaultUsers, ...registeredUsers];


    let userFound = allUsers.find(user =>

        user.username === username &&
        user.password === password &&
        user.role === role

    );


    if (userFound) {

        localStorage.setItem(
            "loggedUser",
            JSON.stringify(userFound)
        );

        alert("Welcome " + userFound.fullname);

        window.location.href = "dashboard.html";

    }

    else {

        alert("Invalid Username, Password or Role!");

    }

}



// ===============================
// CHECK LOGIN
// ===============================

function checkLogin() {

    let user = localStorage.getItem("loggedUser");

    if (!user) {

        alert("Please login first.");

        window.location.href = "index.html";

    }

}



// ===============================
// LOGOUT
// ===============================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedUser");

        window.location.href = "index.html";

    }

}



// ===============================
// SHOW USER
// ===============================

function showUser() {

    let data = localStorage.getItem("loggedUser");

    if (data) {

        let user = JSON.parse(data);

        let element = document.getElementById("usernameDisplay");

        if (element) {

            element.innerHTML =
                user.fullname + " (" + user.role + ")";

        }

    }

}



// ===============================
// AUTO CHECK LOGIN
// ===============================

window.onload = function () {

    if (window.location.pathname.includes("dashboard.html")) {

        checkLogin();

        showUser();

    }

};
