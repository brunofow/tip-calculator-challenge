if (String.prototype.splice === undefined) {
  /**
   * Splices text within a string.
   * @param {int} offset The position to insert the text at (before)
   * @param {string} text The text to insert
   * @param {int} [removeCount=0] An optional number of characters to overwrite
   * @returns {string} A modified string containing the spliced text.
   */
  String.prototype.splice = function(offset, text, removeCount=0) {
    let calculatedOffset = offset < 0 ? this.length + offset : offset;
    return this.substring(0, calculatedOffset) +
      text + this.substring(calculatedOffset + removeCount);
  };
}

const selectors = document.querySelectorAll(".selector");
const bill = document.getElementById("bill");
const person = document.getElementById("person");
const billWarning = document.getElementById("bill-warning");
const peopleWarning = document.getElementById("people-warning");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const percentageInput = document.getElementById("percentage-input");
const resetButton = document.getElementById("reset-button");

var actualBill = "";
var activeTip = "";
var actualPerson = "";

selectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    for (let i = 0; i < selectors.length; i++) {
      selectors[i].classList.remove("active-selector");
    }
    selector.classList.add("active-selector");
    if(selector.hasAttribute("percentage")) {
      activeTip = selector.getAttribute("percentage");
    }
    calcTipAndBill();
  });
});

percentageInput.addEventListener("input", (event) => {
  const str = event.target.value

  if(str.length == 1) {
    activeTip = str.splice(0, "0.0")
  } else {
    activeTip = str.splice(0, "0.")
  }
  calcTipAndBill();
})

bill.addEventListener("input", (event) => {
  actualBill = event.target.value;
  bill.classList.remove("input-warning");
  billWarning.classList.add("invisible");
  calcTipAndBill();
});

person.addEventListener("input", (event) => {
  actualPerson = event.target.value;
  person.classList.remove("input-warning");
  peopleWarning.classList.add("invisible");
  calcTipAndBill();
});

function calcTipAndBill() {
  if (actualBill == "") {
    bill.classList.add("input-warning");
    billWarning.classList.remove("invisible");
    return;
  }
  if (activeTip == "") return;
  if (actualPerson == "") {
    person.classList.add("input-warning");
    peopleWarning.classList.remove("invisible");
    return;
  }

  const totalTip = actualBill * parseFloat(activeTip);
  const unitTip = totalTip / actualPerson;
  const totalBill = actualBill / actualPerson + unitTip;

  tipAmount.innerHTML = unitTip.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  total.innerHTML = totalBill.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  resetButton.classList.add("reset-button");
}

resetButton.addEventListener("click", () => {
  if (!resetButton.classList.contains("reset-button")) return;
  
  actualBill = ""
  activeTip = ""
  actualPerson = ""

  tipAmount.innerHTML = '$0.00'
  total.innerHTML = '$0.00'

  bill.value = ""
  person.value = ""
  percentageInput.value = ""

  selectors.forEach(selector => {
    selector.classList.remove("active-selector")
  })

  resetButton.classList.remove("reset-button");
});
