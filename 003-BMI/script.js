const btnCalculate = document.querySelector('#btnCalculate');
const bmiVAlue = document.querySelector('#bmiValue');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = document.querySelector('#inputHeight');
    const weight = document.querySelector('#inputWeight');

    if(height.value <=0 || weight.value<= 0){
        alert('Enter the Valid value plss.');
        return;
    }

    let heightmeters = height.value/100;
    let bmi = weight.value/(heightmeters**2);
    bmiVAlue.textContent = `BMI = ${bmi.toFixed(1)}`;
    let category = '';
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";
    bmiCategory.textContent = `"${category}"`;
    height.value = '';
    weight.value = '';
})