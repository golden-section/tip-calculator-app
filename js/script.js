// Elements
const billInput = document.getElementById("bill");
const customTipInput = document.getElementById("custom");
const peopleInput = document.getElementById("people");
const radiosTipPercent = document.querySelectorAll('input[name="tip"]');
const warningMsg = document.querySelector(".warning-msg");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total");
const resetButton = document.getElementById("reset");

// Utils
const clearText = (el, value = "$0.00") => el.textContent = value;
const showWarning = () => {
  warningMsg.style.visibility = "visible";
  peopleInput.classList.add("warning-input");
};
const hideWarning = () => {
  warningMsg.style.visibility = "hidden";
  peopleInput.classList.remove("warning-input");
};

// Get selected tip percent (from radio or custom)
function getSelectedTipPercent() {
  const selected = Array.from(radiosTipPercent).find(r => r.checked);
  const custom = parseFloat(customTipInput.value);
  return selected ? parseFloat(selected.value) : (!isNaN(custom) ? custom : 0);
}

// Main calculator
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseFloat(peopleInput.value);
  const tipPercent = getSelectedTipPercent();

  resetButton.disabled = false;

  if (isNaN(bill) || bill <= 0 || isNaN(people)) return;

  if (people === 0) {
    showWarning();
    clearText(tipAmount);
    clearText(totalAmount);
    return;
  }

  hideWarning();
  const tip = (bill * tipPercent) / 100;
  const tipPerPerson = tip / people;
  const totalPerPerson = (bill + tip) / people;

  tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Reset UI
function reset() {
  [billInput, customTipInput, peopleInput].forEach(input => input.value = '');
  radiosTipPercent.forEach(radio => radio.checked = false);
  clearText(tipAmount);
  clearText(totalAmount);
  hideWarning();
  resetButton.disabled = true;
}

// Event Listeners
[billInput, peopleInput].forEach(input =>
  input.addEventListener("input", calculate)
);

customTipInput.addEventListener("input", () => {
  radiosTipPercent.forEach(r => r.checked = false);
  calculate();
});

radiosTipPercent.forEach(r =>
  r.addEventListener("change", () => {
    customTipInput.value = "";
    calculate();
  })
);

resetButton.addEventListener("click", reset);
