// ======================================
// SCNMMS DASHBOARD (Offline / GitHub Pages)
// ======================================

function loadDashboard() {

    document.getElementById("totalDevices").textContent = 25;
    document.getElementById("onlineDevices").textContent = 22;
    document.getElementById("offlineDevices").textContent = 3;
    document.getElementById("alerts").textContent = 4;

    const uptime = document.getElementById("uptime");
    if (uptime) {
        uptime.textContent = "99.9%";
    }
}

window.onload = function () {
    checkLogin();
    showUser();
    loadDashboard();
};
