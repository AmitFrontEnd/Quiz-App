import { questions } from "./quiz.js";

let timerCount = 30;
let intervalId;
let audio = new Audio('music.mp3');
let startBtn = document.querySelector('.start-quiz');
let container = document.querySelector('.container');
let homeContainer = document.querySelector('.home-container');
let body = document.querySelector('body');
let score = document.querySelector('.score');
let timer = document.querySelector('.timer');
let questionRender = document.querySelector('.question-render');
let answer1 = document.querySelector('.answer-1');
let answer2 = document.querySelector('.answer-2');
let answer3 = document.querySelector('.answer-3');
let answer4 = document.querySelector('.answer-4');
let currentQuestion = 0;
let nextQuestion = document.querySelector('.next');
let sound = document.querySelector('.sound');
let mute = document.querySelector('.mute');
let answerContainer = document.querySelector('.answer-container');
let answers = document.querySelectorAll('.answer');

let rightanswer = questions[currentQuestion].answer;

mute.addEventListener('click', () => {
    mute.style.display = 'none';
    sound.style.display = 'block';
    audio.play();
});

sound.addEventListener('click', () => {
    sound.style.display = 'none';
    mute.style.display = 'block';
    audio.pause();
});

startBtn.addEventListener('click', () => {
    container.classList.add('show-quiz');
    homeContainer.style.display = 'none';
    body.style.backgroundColor = '#CCE2C2';
});

function renderQuestions() {
    questionRender.textContent = questions[currentQuestion].question;
    answer1.textContent = questions[currentQuestion].options[0];
    answer2.textContent = questions[currentQuestion].options[1];
    answer3.textContent = questions[currentQuestion].options[2];
    answer4.textContent = questions[currentQuestion].options[3];
}

function startTimer() {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        timerCount--;
        timer.textContent = timerCount < 10 ? `0${timerCount}` : timerCount;
        if (timerCount <= 0) {
            clearInterval(intervalId);
            timer.textContent = "00";
            timerCount = 30;
            currentQuestion++;
            renderQuestions();
            startTimer();
        }
    }, 1000);
}

renderQuestions();
startTimer();

answers.forEach((answer, index) => {
    answer.addEventListener('click', (e) => {
        answers.forEach(ans => ans.removeAttribute('style'));

        e.currentTarget.style.border = '3px solid #cfe0e3';
        clearInterval(intervalId);

        if (index === questions[currentQuestion].answer) {
            score.textContent = (parseInt(score.textContent) + 1).toString().padStart(2, '0');
            e.currentTarget.classList.add('right');
        } else {
            e.currentTarget.classList.add('wrong');
        }
    });
});

nextQuestion.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        currentQuestion = 0;
    }
    renderQuestions();
    startTimer();
});
