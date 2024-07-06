let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const usernameDropdown = document.getElementById("username-dropdown");
const loginButton = document.getElementById("login-btn");

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const CountDownElement = document.getElementById("timer");


let startTime;
let endTime;
let username;
let spent;

loginButton.addEventListener("click", () => {
  username = usernameDropdown.value;

  if (username) {
    startTimer(600, document.getElementById("timer"));
    loginContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    setNextQuestion();
  } else {
    alert("Please select a username");
  }
  startTime = new Date();
});

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else if (currentQuestionIndex === questions.length - 1) {
    showSubmitButton();
  }
});

backButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    setNextQuestion();
  }
});

submitButton.addEventListener("click", () => {
  endTime = new Date();
  showResult();
});

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    if (selectedAnswers[currentQuestionIndex] === index) {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => selectAnswer(index, button));
    answersContainer.appendChild(button);
  });
  nextButton.classList.remove("hide");
  submitButton.classList.add("hide");
  if (currentQuestionIndex === 0) {
    backButton.classList.add("hide");
  } else {
    backButton.classList.remove("hide");
  }
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = "Next";
  } else {
    nextButton.textContent = "Next";
  }
}

function resetState() {
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
  nextButton.classList.add("hide");
}

function selectAnswer(index, button) {
  selectedAnswers[currentQuestionIndex] = index;
  Array.from(answersContainer.children).forEach((child) => {
    child.classList.remove("selected");
  });
  button.classList.add("selected");
  nextButton.classList.remove("hide");
}

function showSubmitButton() {
  questionElement.classList.add("hide");
  answersContainer.classList.add("hide");
  nextButton.classList.add("hide");
  backButton.classList.add("hide");
  submitButton.classList.remove("hide");
}

function showResult() {
  questionElement.classList.add("hide");
  answersContainer.classList.add("hide");
  nextButton.classList.add("hide");
  backButton.classList.add("hide");
  submitButton.classList.add("hide");
  resultContainer.classList.remove("hide");
  CountDownElement.classList.add('hide');
    document.getElementById("usernameShow").textContent = username;
  calculateTimeSpent(startTime, endTime);
  score = selectedAnswers.reduce((total, answerIndex, questionIndex) => {
    return (
      total + (questions[questionIndex].answers[answerIndex]?.correct ? 1 : 0)
    );
  }, 0);
  scoreElement.textContent = `${score} out of ${questions.length}`;
}

setNextQuestion();

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      showSubmitButton();
      CountDownElement.textContent = "Times up!";
    }
  }, 1000);
}

function calculateTimeSpent(start, end) {
  const diff = end - start;
  const minutes = Math.floor(diff / 60000);
  const seconds = ((diff % 60000) / 1000).toFixed(0);
  spent = 'Time spent - ' + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("result-time").textContent = spent;
}
