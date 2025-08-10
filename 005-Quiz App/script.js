const page = window.location.pathname;

if (page.includes("index.html") || page == '/') {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.querySelector("#questionCount").value;
    const category = document.querySelector("#questionCategory").value;
    const difficulty = document.querySelector("#questionDifficulty").value;
    const settings = { amount, category, difficulty };
    localStorage.setItem("quiz_settings", JSON.stringify(settings));

  window.location.href = "./quiz.html";

  });
}


if (page.includes("quiz.html")) {

  const settings = JSON.parse(localStorage.getItem("quiz_settings"));
  const { amount, category, difficulty } = settings;

  const API_URL = `https://opentdb.com/api.php?amount=${amount}&type=multiple&category=${category}&difficulty=${difficulty}`;

  const questionEl = document.querySelector(".question");
  const optionBtns = document.querySelectorAll(".button-55");
  const timeEl = document.querySelector("h1");
  const questionsContainer = document.querySelector(".questions");
  const ticktick = document.querySelector('#ticktick');
  const click = document.querySelector('#click');

  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let correctAnswer = -1;
  let timer;
  let timeLeft = 30;

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results.map((q) => {
        const options = [...q.incorrect_answers];
        const correct = Math.floor(Math.random() * 4);
        options.splice(correct, 0, q.correct_answer);
        return {
          question: decode(q.question),
          options: options.map(decode),
          answer: correct,
        };
      });
      showQuestion();
    });

  function decode(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  function showQuestion() {
    resetOptions();
    timeLeft = 30;
    updateTimer();
    ticktick.play();

    const current = questions[currentIndex];
    questionEl.textContent = current.question;
    correctAnswer = current.answer;

    optionBtns.forEach((btn, i) => {
      btn.textContent = current.options[i];
      btn.onclick = () => checkAnswer(i);
      btn.disabled = false;
      btn.style.backgroundColor = "";
    });

    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(-1);
      }
    }, 1000);
  }

  function checkAnswer(selected) {
    click.play();
    clearInterval(timer);
    ticktick.pause();
    ticktick.currentTime = 0;
    optionBtns.forEach((btn, i) => {
      btn.disabled = true;
      btn.style.backgroundColor =
        i === correctAnswer
          ? "#a0ffa0"
          : i === selected
          ? "#ffa0a0"
          : "#ccc";
    });

    if (selected === correctAnswer) score++;

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1500);
  }

  function updateTimer() {
    timeEl.textContent = `Time: ${timeLeft}s`;
    timeEl.style.color = timeLeft <= 5 ? "#ff5050" : "#00ffe7";
  }

  function resetOptions() {
    optionBtns.forEach((btn) => {
      btn.style.backgroundColor = "";
      btn.disabled = false;
    });
  }

  function showResult() {
    questionsContainer.innerHTML = `
      <h1>Quiz Finished!</h1>
      <h2>You scored ${score} out of ${questions.length}</h2>
      <button class="button-55" onclick="window.close()">Close Window</button>
    `;
    localStorage.setItem("quiz_score", `${score}/${questions.length}`);
  }
}