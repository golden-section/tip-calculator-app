// // input elements
// const billInput = document.getElementById("bill");
// const customTipInput = document.getElementById("custom");
// const peopleInput = document.getElementById("people");
// const radiosTipPercent = document.querySelectorAll('input[name="tip"]');

// // warning message
// const warningMsg = document.querySelector(".warning-msg");

// // output elements & reset btn
// const tipAmount = document.getElementById("tip-amount");
// const totalAmount = document.getElementById("total");
// const resetButton = document.getElementById("reset");

// // function to select predefined tip in % or custom value
// function getSelectedTipPercent() {
//   const selectedRadio = Array.from(radiosTipPercent).find(
//     (radio) => radio.checked
//   );
//   const customValue = parseFloat(customTipInput.value);

//   if (selectedRadio) {
//     return parseFloat(selectedRadio.value);
//   } else if (!isNaN(customValue)) {
//     return customValue;
//   }
//   return 0;
// }

// // main function to calculate
// function calculate() {
//   const bill = parseFloat(billInput.value);
//   const people = parseFloat(peopleInput.value);
//   const tipPercent = getSelectedTipPercent();

//   if (isNaN(bill) || bill <= 0 || isNaN(people)) {
//     resetButton.disabled = false;
//     return;
//   }

//   if (people == 0) {
//     warningMsg.style.visibility = "visible";
//     peopleInput.classList.add("warning-input");
//   } else {
//     const tip = (bill * tipPercent) / 100;
//     const tipPerPerson = tip / people;
//     const totalPerPerson = (bill + tip) / people;

//     warningMsg.style.visibility = "hidden";
//     peopleInput.classList.remove("warning-input");
//     tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
//     totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
//     resetButton.disabled = false;
//   }
// }

// // Listeners
// billInput.addEventListener("input", calculate);
// peopleInput.addEventListener("input", calculate);
// customTipInput.addEventListener("input", () => {
//   radiosTipPercent.forEach(radio => radio.checked = false);
//   calculate();
// });

// radiosTipPercent.forEach((radio) =>
//   radio.addEventListener("change", () => {
//     customTipInput.value = "";
//     calculate();
//   })
// );

// resetButton.addEventListener('click', () => {
//   billInput.value = '';
//   peopleInput.value = '';
//   customTipInput.value = '';
//   tipAmount.textContent = '$0.00';
//   totalAmount.textContent = '$0.00';
//   radiosTipPercent.forEach(radio => radio.checked = false);
//   resetButton.disabled = true;
// });


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
