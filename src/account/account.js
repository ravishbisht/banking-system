const logoutBtn = document.getElementById("logout");

const showBalance = document.getElementById("showBalance");
const deposite = document.getElementById("deposite");
const acInfo = document.getElementById("acInfo");
const acInfo1 = document.getElementById("acInfo1");
const acBalance = document.getElementById("acBalance");

const Initialdeposite = document.getElementById("Initialdeposite");
const acType = document.getElementById("account-type");

const createAcBtn = document.getElementById("createAc");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("data");
  window.location.replace("/src/login/login.html");
});

window.addEventListener("load", () => {
  let storage = localStorage.getItem("data");
  if (!storage) {
    window.location.replace("/src/login/login.html");
  }
  //show welcome toast
});

////////////////////////////////////////////////////////////

const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");

let isDragging = false,
  startY,
  startHeight;

const showBottomSheet = () => {
  bottomSheet.classList.add("show");
  document.body.style.overflowY = "hidden";
  updateSheetHeight(50);
};

const updateSheetHeight = (height) => {
  sheetContent.style.height = `${height}vh`;
  bottomSheet.classList.toggle("fullscreen", height === 100);
};

const hideBottomSheet = () => {
  bottomSheet.classList.remove("show");
  document.body.style.overflowY = "auto";
};

const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.style.height);
  bottomSheet.classList.add("dragging");
};

const dragging = (e) => {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeight + (delta / window.innerHeight) * 100;
  updateSheetHeight(newHeight);
};

const dragStop = () => {
  isDragging = false;
  bottomSheet.classList.remove("dragging");
  const sheetHeight = parseInt(sheetContent.style.height);
  sheetHeight < 25
    ? hideBottomSheet()
    : sheetHeight > 75
    ? updateSheetHeight(100)
    : updateSheetHeight(50);
};

dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

sheetOverlay.addEventListener("click", hideBottomSheet);
showModalBtn.addEventListener("click", showBottomSheet);
//////////////////////////////////////////////////////////////////

class BankAccount {
  constructor(fullName, email, accountType, password, phoneNumber, balance) {
    this.accountNumber =
      Math.floor(Math.random() * 900000000000) + 100000000000;
    this.fullName = fullName;
    this.email = email;
    this.accountType = accountType;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.balance = balance;
  }

  saveToLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this));
  }

  createAccount() {
    const balance = parseFloat(Initialdeposite.value);

    this.accountType = acType.value;
    this.balance += balance;

    acType.value = "saving";
    Initialdeposite.value = "";
    this.saveToLocalStorage();
  }

  showInUi() {
    acInfo.innerHTML = `
      <div class="p-6 bg-blue-100 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">Account 1 Details</h2>
        <ul class="space-y-2 text-gray-700">
          <li><strong>Name:</strong> ${this.fullName}</li>
          <li><strong>Phone:</strong> ${this.phoneNumber}</li>
          <li><strong>Email:</strong> ${this.email}</li>
          <li><strong>Account Type:</strong> ${this.accountType}</li>
          <li><strong>Account Number:</strong> ${this.accountNumber}</li>
        </ul>
      </div>
    `;
  }
}

createAcBtn.addEventListener("click", () => {
  let storedData = JSON.parse(localStorage.getItem("data"));
  if (!storedData) {
    console.error("No user data found in localStorage.");
    return;
  }

  const account = new BankAccount(
    storedData.fullName,
    storedData.email,
    storedData.accountType,
    storedData.password,
    storedData.phoneNumber,
    storedData.balance
  );

  account.createAccount();
  account.showInUi();
});

document.addEventListener("DOMContentLoaded", () => {
  let { fullName, email, accountType, password, phoneNumber, balance } = JSON.parse(
    localStorage.getItem("data")
  );
  const account = new BankAccount(
    fullName,
    email,
    accountType,
    password,
    phoneNumber,
    balance
  );
  account.showInUi({
    fullName,
    email,
    accountType,
    password,
    phoneNumber,
    balance,
  });
});
