const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sessionData = JSON.parse(sessionStorage.getItem("data"));
  if (!sessionData) {
    ToastWarning("No account registered. please create account");
    return;
  }

  if (email.value !== sessionData.email) {
    ToastDanger("Incorrect Email");
    return;
  }

  //comparing passwords
  dcodeIO.bcrypt.compare(
    password.value,
    sessionData.password,
    (err, res) => {
      if (res) {
        ToastSuccess("successfull logged In");
        console.log(sessionData);
        localStorage.setItem("data", JSON.stringify(sessionData));
        window.location.replace("/src/account/account.html");
      }else{
        ToastDanger("Incorrect Password");
        return;
      }
    }
  );
});

window.addEventListener("load", () => {
  let storage = localStorage.getItem("data");
  if (storage) {
    window.location.replace("/src/account/account.html");
  }
});

// let res = dcodeIO.bcrypt.compare(
//   "ravish",
//   "$2a$10$oYtabsa8.osqf0Ldq474ROydw4Ol3STEFy/egFWWY1norf17Qzp.O",(err, res)=>{
//     console.log("res:",res)
//     console.log("err",err)
//   }
// );

// ToastSuccess('This is a Success!');
// ToastWarning('This is a Warning!');
// ToastDanger('This is a Danger!');
// ToastInfo('This is an Info!');
// ToastPrimary('This is a Primary!');
