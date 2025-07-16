const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom');
const peopleInput = document.getElementById('people');
const tipPresets = document.querySelectorAll('.tip-grid button');
const tipAmount = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total');
const resetButton = document.getElementById('reset');

billInput.addEventListener('input', () => {
    const billValue = parseFloat(billInput.value);
    console.log(billValue);
});