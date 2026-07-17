function register() {

    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!fullname || !username || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.username === username);

    if (exists) {
        alert("Username already exists.");
        return;
    }

    users.push({
        fullname,
        username,
        password,
        role
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "index.html";
}
