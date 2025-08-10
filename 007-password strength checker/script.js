const password = document.querySelector('input');
const strength = document.querySelector('h2');
const strengthbar = document.querySelector('.strength');
const togglePassword = document.querySelector('#togglePassword');

const strengthm = ['very week❌', 'week❌', 'normal', 'strong', 'good👍'];
const strengthColor = ['#f84336ff', '#ff9800', '#fee502ff', '#75b927ff', '#01f409ff'];

password.addEventListener('input', () => {
    let regex = {
        lower: /[a-z]/,
        upper: /[A-Z]/,
        digit: /\d/,
        symbol: /[!@#$%^&*(),.?":{}|<>]/,
        length: /.{8,}/
    }

    if(password.value.includes(' ')){
        alert('Space are not allowed.');
        return;
    }

    let score= 0;

    if(regex.lower.test(password.value)) score++;
    if(regex.upper.test(password.value)) score++;
    if(regex.digit.test(password.value)) score++;
    if(regex.symbol.test(password.value)) score++;
    if(regex.length.test(password.value)) score++;

    strength.textContent = strengthm[score-1];
    strengthbar.style.backgroundColor = strengthColor[score-1];
    strengthbar.style.width = `${score*20}%`;

});

togglePassword.addEventListener('click', () => {
    togglePassword.textContent = togglePassword.textContent == '🙈' ? '👀' : '🙈';
    password.type = password.type == 'password'? 'text' : 'password';
});