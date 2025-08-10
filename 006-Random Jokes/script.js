const goodSound = [
    new Audio('good/1.mp3'),
    new Audio('good/2.mp3'),
    new Audio('good/3.mp3'),
    new Audio('good/4.mp3'),
    new Audio('good/5.mp3')
]

const badSound = [
    new Audio('bad/1.mp3'),
    new Audio('bad/2.mp3'),
    new Audio('bad/3.mp3'),
    new Audio('bad/4.mp3'),
    new Audio('bad/5.mp3'),
    new Audio('bad/6.mp3')
]

let goodIndex;
let badIndex;



async function newjoke() {
    goodIndex = Math.floor(Math.random()* goodSound.length);
    badIndex = Math.floor(Math.random()* badSound.length);
    const joke = document.querySelector('.joke');
    const loading = document.querySelector('.loader');

    try{
        loading.style.display = 'block';
        const res = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await res.json();
        if (data.type === "single") {
            joke.textContent = data.joke;
        }
        else if (data.type === "twopart") {
            joke.textContent = `${data.setup} 🤔 ${data.delivery}`;
            }
    }
    catch (error) {
        joke.textContent = "error during fetching joke.";
        console.log('error = ', error);
    }
    finally {
        loading.style.display = 'none';
    }
};

function soundPLay(mood) {
    if(mood == 'good') {
        goodSound[goodIndex].currentTime = 0;
        goodSound[goodIndex].play();
    }
    else  {
        badSound[badIndex].currentTime = 0;
        badSound[badIndex].play();}
}

window.onload = newjoke();


