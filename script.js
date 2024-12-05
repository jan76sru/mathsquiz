// DOM Elements
const settingsDiv = document.getElementById('settings');
const questionnaireDiv = document.getElementById('questionnaire');
const resultDiv = document.getElementById('result');

const startQuizButton = document.getElementById('startQuiz');
const nextQuestionButton = document.getElementById('nextQuestion');
const retryQuizButton = document.getElementById('retryQuiz');

const questionElement = document.getElementById('question');
const userAnswerElement = document.getElementById('userAnswer');
const questionProgressElement = document.getElementById('questionProgress');
const timerDisplayElement = document.getElementById('timerDisplay');

const scoreElement = document.getElementById('score');
const percentageElement = document.getElementById('percentage');

// Variables
let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;
let timerValue = 0;

// Start Quiz
startQuizButton.addEventListener('click', () => {
  const numQuestions = parseInt(document.getElementById('numQuestions').value);
  const minRange = parseInt(document.getElementById('minRange').value);
  const maxRange = parseInt(document.getElementById('maxRange').value);
  timerValue = parseInt(document.getElementById('timer').value);

  const operations = [];
  if (document.getElementById('add').checked) operations.push('+');
  if (document.getElementById('subtract').checked) operations.push('-');
  if (document.getElementById('multiply').checked) operations.push('*');
  if (document.getElementById('divide').checked) operations.push('/');

  if (operations.length === 0) {
    alert('Please select at least one arithmetic operation!');
    return;
  }

  questions = generateQuestions(numQuestions, minRange, maxRange, operations);
  currentQuestionIndex = 0;
  correctAnswers = 0;

  settingsDiv.style.display = 'none';
  questionnaireDiv.style.display = 'block';

  showQuestion();
});

// Generate Questions
function generateQuestions(num, min, max, operations) {
  const questions = [];
  for (let i = 0; i < num; i++) {
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const question = { num1, num2, operation };
    questions.push(question);
  }
  return questions;
}

// Show Question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = `${question.num1} ${question.operation} ${question.num2} = ?`;
  questionProgressElement.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  userAnswerElement.value = '';
  startTimer();
}

// Timer
function startTimer() {
  clearInterval(timer);
  let timeLeft = timerValue;
  timerDisplayElement.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplayElement.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
}

// Check Answer
function checkAnswer() {
  clearInterval(timer);
  const question = questions[currentQuestionIndex];
  const correctAnswer = eval(`${question.num1} ${question.operation} ${question.num2}`);
  const userAnswer = parseFloat(userAnswerElement.value);

  if (userAnswer === correctAnswer) {
    correctAnswers++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show Result
function showResult() {
  questionnaireDiv.style.display = 'none';
  resultDiv.style.display = 'block';

  const percentage = Math.round((correctAnswers / questions.length) * 100);
  scoreElement.textContent = `You got ${correctAnswers} out of ${questions.length} correct.`;
  percentageElement.textContent = `Your score: ${percentage}%`;
}

// Retry Quiz
retryQuizButton.addEventListener('click', () => {
  resultDiv.style.display = 'none';
  settingsDiv.style.display = 'block';
});
