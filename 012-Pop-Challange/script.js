let count = 0;
let time = 60;
let active = false;
let timerDuration = 60;
let timerInterval;

let popSound = new Audio("sounds/pop.mp3");
let tiktikSound = new Audio("sounds/tiktik.mp3");
let lastSecondSound = new Audio("sounds/lastSecond.mp3");

function setTime(t) {
    timerDuration = parseInt(t);
    time = timerDuration;
  document.querySelector("#timer").innerHTML = `${time}s`;

}

function saveScore() {
    let key = timerDuration.toString(); // e.g. "15", "30", etc.
    
    let highScores = JSON.parse(localStorage.getItem("highScores")) || {};
    
    if (!highScores[key] || count > highScores[key].score) {
    let username = prompt("Enter your name:");
    highScores[key] = { name: username, score: count };
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  showHighScore(key);
}

function showHighScore(key) {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || {};
  let data = highScores[key];

  if (data) {
    const overDiv = document.querySelector("#over");
    const highScoreDisplay = document.createElement("p");
    highScoreDisplay.innerHTML = `High Score: ${data.name} - ${data.score}`;
    overDiv.appendChild(highScoreDisplay);
  }
}

function gamestart() {
  if (!active) {
    active = true;
    document.querySelector("#time-dropdown").disabled = true;
    timerInterval = setInterval(() => {
      tiktikSound.loop = true;
      tiktikSound.play();
      time--;

      const timerDisplay = document.querySelector("#timer");
      timerDisplay.innerHTML = `${time}s`;

      if (time <= 5) {
        tiktikSound.pause();
        lastSecondSound.play();
        timerDisplay.style.color = "red";
        timerDisplay.style.animation = "blink 0.5s infinite";
      }

      if (time <= 0) {
        clearInterval(timerInterval);
        document.querySelector("#over").style.visibility = "visible";
        document.querySelector("#score").innerHTML = count;
        document.querySelector("#time-dropdown").disabled = false;
        saveScore();
      }
    }, 1000);
  }
}

// Destroy balloon and spawn new ones
function distroy(baloons) {
  if (!active) gamestart();

  baloons.classList.add("pop");

  setTimeout(() => {
    popSound.currentTime = 0;
    popSound.play();
    baloons.remove();
    count++;
    document.querySelector("#count").innerHTML = `Score ${count}`;

    for (let i = 0; i < 2; i++) {
      let newbaloons = document.createElement("span");
      newbaloons.className = "baloons";
      newbaloons.innerHTML = "🎈";
      newbaloons.onclick = function () {
        distroy(this);
      };

      const gameArea = document.querySelector(".gamearea");
      const areaWidth = gameArea.clientWidth;
      const areaHeight = gameArea.clientHeight;

      const x = Math.round(Math.random() * (areaWidth - 60));
      const y = Math.round(Math.random() * (areaHeight - 60));

      newbaloons.style.left = `${x}px`;
      newbaloons.style.top = `${y}px`;

      gameArea.appendChild(newbaloons);
    }
  }, 150);
}