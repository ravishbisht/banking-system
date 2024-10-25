const registerOrLogin = document.getElementById("registerOrLogin");
const navAccount = document.getElementById("navAccount");
let logoutBtn = document.getElementById("logout");
let storage = localStorage.getItem("data");


if (storage) {
  registerOrLogin.style.display = "none";
  navAccount.style.display = "block";
  logoutBtn.style.display = "inline";
} else {
  registerOrLogin.style.display = "block";
  navAccount.style.display = "none";
  logoutBtn.style.display = "none";
}


logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("data");
    window.location.replace("/src/login/login.html")
})
