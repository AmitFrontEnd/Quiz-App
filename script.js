import { questions } from "./quiz.js";
let timerCount = 30;
let intervalId;
let scoreCount = 1;

let audio = new Audio('music.mp3')
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
let sound = document.querySelector('.sound')
let mute = document.querySelector('.mute')
let answerContainer = document.querySelector('.answer-container')
let answers = document.querySelectorAll('.answer')
let correctAnswer = 0;

let rightanswer;

score.textContent = scoreCount


mute.addEventListener('click', () => {
    mute.style.display = 'none'
    sound.style.display = 'block'
    audio.play()
})
sound.addEventListener('click', () => {
    sound.style.display = 'none'
    mute.style.display = 'block'
    audio.pause()
})


rightanswer = questions[currentQuestion]['answer']



startBtn.addEventListener('click', () => {
    container.classList.add('show-quiz');
    homeContainer.style.display = 'none';
    body.style.backgroundColor = '#CCE2C2';
});

function renderQuestions() {
    questionRender.textContent = questions[currentQuestion].question;
    answer1.textContent = questions[currentQuestion].options[0]
    answer2.textContent = questions[currentQuestion].options[1]
    answer3.textContent = questions[currentQuestion].options[2]
    answer4.textContent = questions[currentQuestion].options[3]
}




renderQuestions()


function startTimer() {

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        timerCount--;
        timer.textContent = timerCount < 10 ? `0${timerCount}` : timerCount;

        if (timerCount <= 15 && timerCount > 5) {
            body.style.backgroundColor = '#E4E5C7';
            timer.parentElement.style.backgroundColor = '#C5B1006E';
        } else if (timerCount <= 5) {
            body.style.backgroundColor = '#DBADAD';
            timer.parentElement.style.backgroundColor = '#C50C006E';
        } else {
            body.style.backgroundColor = '#CCE2C2'; // Default background color
            timer.parentElement.style.backgroundColor = '#15a71c'; // Default timer background color
        }

        if (timerCount <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}
startTimer()

nextQuestion.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion === questions.length) { // Assuming there are 24 questions
        currentQuestion = 0;
        scoreCount = 0;
        alert('Your total correct answer is :'  + correctAnswer)
    }
    renderQuestions();
    rightanswer = questions[currentQuestion]['answer']
    timerCount = 31
    startTimer()
    rightanswer = questions[currentQuestion]['answer']
    console.log(rightanswer);

    answers.forEach((item) => {
        item.classList.remove('right');
        item.classList.remove('wrong');
        item.style.pointerEvents = 'all'
        let pElem = item.querySelector('p')
        pElem.style.display = 'none';
        let img = item.querySelector('p img')
        img.src = 'wrong.png'
        pElem.querySelector('.chosen').style.display = 'block';

    })
    scoreCount++
    score.textContent = scoreCount

});

answerContainer.addEventListener('click', (e) => {
    let targetElement = e.target.closest('.answer');



    if (targetElement && targetElement.classList.contains('answer')) {

        let index = targetElement.getAttribute('data-index');

        let pElement = targetElement.querySelector('p');
        let imgElement = pElement.querySelector('img');

        if (index == rightanswer) {
            targetElement.classList.add('right');
            correctAnswer++;
            console.log('right', correctAnswer);


            imgElement.src = 'correct.png';
            imgElement.style.display = 'block';
            pElement.querySelector('.chosen').style.display = 'none';
            pElement.style.display = 'flex'
        } else {
            targetElement.classList.add('wrong');
            imgElement.style.display = 'block';
            pElement.style.display = 'flex';
            if (correctAnswer != 0) correctAnswer--;

        }
    }
});
