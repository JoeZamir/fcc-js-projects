/*const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);
  if (isNaN(cash)) return;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = parseFloat((cash - price).toFixed(2));
  let totalCID = parseFloat(cid.reduce((sum, [, amt]) => sum + amt, 0).toFixed(2));

  if (changeNeeded > totalCID) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (changeNeeded === totalCID) {
    // ✅ Status CLOSED logic for step 18 & 19
    let output = "Status: CLOSED";
    for (let [name, amt] of cid) {
      if (amt > 0) {
        output += ` ${name}: $${amt}`;
      }
    }
    changeDue.textContent = output;
    return;
  }

  // Calculate OPEN case
  let changeArr = [];
  let reversedCID = [...cid].reverse();

  for (let [name, amt] of reversedCID) {
    let unitVal = currencyUnits[name];
    let toReturn = 0;

    while (changeNeeded >= unitVal && amt > 0) {
      changeNeeded = parseFloat((changeNeeded - unitVal).toFixed(2));
      amt = parseFloat((amt - unitVal).toFixed(2));
      toReturn = parseFloat((toReturn + unitVal).toFixed(2));
    }

    if (toReturn > 0) {
      changeArr.push(`${name}: $${toReturn}`);
    }
  }

  if (changeNeeded > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  changeDue.textContent = `Status: OPEN ${changeArr.join(" ")}`;
});*/
const changeDueElement = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const cashInput = document.getElementById('cash');
const totalElement = document.querySelector('.total');
const drawerParagraphs = document.querySelectorAll('.register-change p');

// Example price
const price = 3.26;
totalElement.textContent = `Total: $${price.toFixed(2)}`;

// Cash-in-drawer format: [["PENNY", 0.97], ["NICKEL", 2.05], ...]
let cid = [
  ["PENNY", 0.97],
  ["NICKEL", 2.05],
  ["DIME", 2.9],
  ["QUARTER", 3.75],
  ["ONE", 89],
  ["FIVE", 50],
  ["TEN", 10],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

purchaseBtn.addEventListener('click', () => {
  const cash = parseFloat(cashInput.value);
  if (isNaN(cash)) {
    changeDueElement.textContent = "Please enter a valid amount.";
    return;
  }

  const result = checkCashRegister(price, cash, cid);
  updateUI(result);
});

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let totalCID = cid.reduce((sum, [, amount]) => sum + amount, 0).toFixed(2);

  if (Number(totalCID) < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (Number(totalCID) === change) {
    return { status: "CLOSED", change: cid };
  }
  return { status: "OPEN", change: [["QUARTER", 0.5], ["DIME", 0.2]] }; // Dummy example
}

function updateUI(result) {
  // Update status
  changeDueElement.textContent = `Status: ${result.status}`;

  // Update drawer display (existing amounts)
  cid.forEach((denomination, index) => {
    const [name, amount] = denomination;
    drawerParagraphs[index].textContent = `${capitalize(name)}: $${amount.toFixed(2)}`;
  });
}

// Helper
function capitalize(str) {
  return str.charAt(0) + str.slice(1).toLowerCase();
}

