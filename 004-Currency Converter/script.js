
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#inputFrom').value; 
    const from = document.querySelector('#from').value;
    const to = document.querySelector('#to').value;
    convertCurrency(from, to, input);
})

async function convertCurrency(from, to, input) {
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/25449a38e3becab3ac02c75c/latest/${from}`);
        const data = await response.json();
        const rate = data.conversion_rates[to];
        const ConvertedAmount = Number(input)*rate;
        const output1 = document.querySelector('#output1');
        const output2 = document.querySelector('#output2');
        output1.textContent = `Rate: ${rate} ${to}`;
        output2.textContent = `Total = ${ConvertedAmount.toFixed(2)} ${to}`;
        }
        catch (error){
            output.textContent = error;
        };
    }