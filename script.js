let currentQuestion = 0;
let score = 0;
let questions = [];

const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreDisplay = document.getElementById("score");

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  optionsBox.innerHTML = '';

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
    optionsBox.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (selected.value === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz-box").classList.add("hide");
    resultBox.classList.remove("hide");
    scoreDisplay.textContent = `${score} / ${questions.length}`;
  }
});