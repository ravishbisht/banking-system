const signupForm = document.getElementById("signupForm");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
// const accountType = document.getElementById("account-type");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");


document.addEventListener("DOMContentLoaded", () => {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //validating form fields
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName.value.length < 3 || fullName.value.length > 25) {
      ToastWarning("Full Name atleast have 3 characters but not more than 25");
      return;
    } else if (!emailPattern.test(email.value)) {
      ToastWarning("Invalid Email");
      return;
    } else if (phoneNumber.value.length < 10 || phoneNumber.value.length > 15) {
      ToastWarning("Phone Number must have atleast Ten numbers");
      return;
    } else if (password.value.length < 4 || confirmPassword.value.length < 4) {
      ToastDanger("password length must be atleast 4");
      return;
    } else if (password.value !== confirmPassword.value) {
      ToastDanger("password and confirm-password is not same");
      return;
    }

    // hash password
    const saltRounds = 10;
    dcodeIO.bcrypt.hash(
      password.value,
      saltRounds,
      function (err, hashedPassword) {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const data = {
            fullName: fullName.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            // accountType: accountType.value,
            password: hashedPassword,
            confirmPassword: confirmPassword.value,
          };
          localStorage.setItem("data", JSON.stringify(data));
          console.log("local storage")
          sessionStorage.setItem("data", JSON.stringify(data));
          ToastSuccess("Account Created successfully");
          fullName.value = "";
          email.value = "";
          phoneNumber.value = "";
          // accountType.value = "";
          password.value = "";
          confirmPassword.value = "";
          confirmPassword.value = "";
          ToastInfo("You have Logged In");
          window.location.replace("/src/account/account.html");
        }
      }
    );
  });
});

window.addEventListener("load", () => {
  let storage = localStorage.getItem("data");
  // console.log("storage:", storage);
  if (storage) {
    window.location.replace("/src/account/account.html");
  }
});

// ToastSuccess('This is a Success!');
// ToastWarning('This is a Warning!');
// ToastDanger('This is a Danger!');
// ToastInfo('This is an Info!');
// ToastPrimary('This is a Primary!');

// let res = dcodeIO.bcrypt.compare(
//   "ravish",
//   "$2a$10$oYtabsa8.osqf0Ldq474ROydw4Ol3STEFy/egFWWY1norf17Qzp.O",(err, res)=>{
//     console.log("res:",res)
//     console.log("err",err)
//   }
// );
