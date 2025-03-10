import { questions } from "./quiz.js";
let timerCount = 30;
let intervalId;
let scoreCount = localStorage.getItem('storedCount') ? parseInt(localStorage.getItem('storedCount')) : 1;
localStorage.setItem('storedCount', scoreCount)
let success = document.querySelector('.success')
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
let nextQuestion = document.querySelector('.next');
let sound = document.querySelector('.sound')
let mute = document.querySelector('.mute')
let answerContainer = document.querySelector('.answer-container')
let answers = document.querySelectorAll('.answer')
let correctAnswer = localStorage.getItem('storedCorrect') ? parseInt(localStorage.getItem('storedCorrect')) : 0;
let correctPercent = document.querySelector('.correct-percent')
let wrongPercent = document.querySelector('.wrong-percent')
let totalCorrect = document.querySelector('.total-correct')
let wrongAnswer = 0;
let fail = document.querySelector('.fail')
totalCorrect.textContent = localStorage.getItem('storedCorrect')
let reset=document.querySelector('.reset')


let resultContainer = document.querySelector('.result-container')
let mainContainer = document.querySelector('.container')

localStorage.setItem('storedCorrect', correctAnswer)
let currentQuestion = localStorage.getItem('storedQuestion') ? parseInt(localStorage.getItem('storedQuestion')) : 0;

localStorage.setItem('storedQuestion', currentQuestion);
let imgInsideSuccess = document.querySelector('.success img');
let imgInsideFail = document.querySelector('.fail img');

correctPercent.textContent = localStorage.getItem('storedCorrectPercent')
wrongPercent.textContent = localStorage.getItem('storedWrongPercent')
success.style.width = `${localStorage.getItem('storedCorrectPercent')}%`;
fail.style.width = `${localStorage.getItem('storedWrongPercent')}%`;
// Hide the image if the storedWrongPercent is 0
function imageSetup() {

    if (parseFloat(localStorage.getItem('storedWrongPercent')) === 0) {
        imgInsideFail.style.display = 'none';
    } else {
        // Apply the right position based on the percentage ranges
        if (parseFloat(localStorage.getItem('storedWrongPercent')) < 10) {
            imgInsideFail.style.right = '-25px';
        } else if (parseFloat(localStorage.getItem('storedWrongPercent')) < 15) {
            imgInsideFail.style.right = '-30px';
        } else if (parseFloat(localStorage.getItem('storedWrongPercent')) > 21) {
            imgInsideFail.style.right = '-20px';
        }
    }

    // Apply the left position for imgInsideSuccess if storedCorrectPercent is less than 15
    if (parseFloat(localStorage.getItem('storedCorrectPercent')) < 15) {
        imgInsideSuccess.style.left = '-28px';
    }
}

imageSetup()


let rightanswer;
checkDisable()
function checkDisable() {
    let found = false;
    answers.forEach(answer => {
        if (answer.classList.contains('right') || answer.classList.contains('wrong')) {
            found = true;
        }
    });

    if (found) {
        nextQuestion.disabled = false;
    } else {
        nextQuestion.disabled = true;
    }
}

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
    renderQuestions()
    startTimer()
});

function renderQuestions() {
    questionRender.textContent = questions[currentQuestion].question;
    answer1.textContent = questions[currentQuestion].options[0]
    answer2.textContent = questions[currentQuestion].options[1]
    answer3.textContent = questions[currentQuestion].options[2]
    answer4.textContent = questions[currentQuestion].options[3]
}




function startTimer() {

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        timerCount--;
        timer.textContent = timerCount < 10 ? `0${timerCount}` : timerCount;

        if (timerCount <= 15 && timerCount > 5) {
            body.style.backgroundColor = '#E4E5C7';
            timer.parentElement.style.backgroundColor = '#C5B1006E';
            nextQuestion.style.color = '#C5B1006E'

        } else if (timerCount <= 5) {
            body.style.backgroundColor = '#DBADAD';
            timer.parentElement.style.backgroundColor = '#C50C006E';
            nextQuestion.style.color = '#C50C006E'
        } else {
            body.style.backgroundColor = '#CCE2C2'; // Default background color
            timer.parentElement.style.backgroundColor = '#15a71c'; // Default timer background color
            nextQuestion.style.color = '#15a71c'
        }

        if (timerCount <= 0) {
            clearInterval(intervalId);
            nextQuestion.disabled = false
            nextQuestion.click();
        }
    }, 900);
}

nextQuestion.addEventListener('click', () => {

    currentQuestion++;
    localStorage.setItem('storedQuestion', currentQuestion);

    if (currentQuestion === questions.length) {
        currentQuestion = 0;
        localStorage.setItem('storedQuestion', currentQuestion);
        scoreCount = 0;
        localStorage.setItem('storedCount', scoreCount)
        wrongAnswer = 25 - correctAnswer
        totalCorrect.textContent = correctAnswer
        correctPercent.textContent = localStorage.getItem('storedCorrectPercent')
        wrongPercent.textContent = localStorage.getItem('storedWrongPercent')



        // Calculate the percentage of correct answers
        let correctPercentValue = (correctAnswer / 25) * 100;
        localStorage.setItem('storedCorrectPercent', correctPercentValue.toFixed(2));
        let storedCorrectPercent = parseFloat(localStorage.getItem('storedCorrectPercent'));
        correctPercent.textContent = storedCorrectPercent.toFixed(2);
        success.style.width = `${storedCorrectPercent}%`;

        // Calculate the percentage of wrong answers
        let wrongPercentValue = (wrongAnswer / 25) * 100;
        localStorage.setItem('storedWrongPercent', wrongPercentValue.toFixed(2));
        let storedWrongPercent = parseFloat(localStorage.getItem('storedWrongPercent'));
        wrongPercent.textContent = storedWrongPercent.toFixed(2);
        fail.style.width = `${storedWrongPercent}%`;
        imageSetup()
        mainContainer.style.display = 'none'
        resultContainer.style.display = 'block'
        clearInterval(intervalId);
        correctAnswer = 0;

        localStorage.setItem('storedCorrect', correctAnswer)
    }




    renderQuestions();
    rightanswer = questions[currentQuestion]['answer']
    timerCount = 31
    startTimer()
    rightanswer = questions[currentQuestion]['answer']

    answers.forEach((item) => {
        item.classList.remove('right');
        item.classList.remove('wrong');
        let pElem = item.querySelector('p')
        pElem.style.display = 'none';
        let img = item.querySelector('p img')
        img.src = 'wrong.png'
        pElem.querySelector('.chosen').style.display = 'block';

        item.style.pointerEvents = 'all'

    })
    answerContainer.style.pointerEvents = 'all'

    scoreCount++
    localStorage.setItem('storedCount', scoreCount)

    score.textContent = scoreCount;

    checkDisable()
});

answerContainer.addEventListener('click', (e) => {
    let targetElement = e.target.closest('.answer');



    if (targetElement && targetElement.classList.contains('answer')) {

        let index = targetElement.getAttribute('data-index');
        let pElement = targetElement.querySelector('p');
        let imgElement = pElement.querySelector('img');
        clearInterval(intervalId);
        if (index == rightanswer) {
            targetElement.classList.add('right');
            answerContainer.style.pointerEvents = 'none'

            correctAnswer++;

            localStorage.setItem('storedCorrect', correctAnswer)
            console.log('right', correctAnswer);
            clearInterval(intervalId)

            imgElement.src = 'correct.png';
            imgElement.style.display = 'block';
            pElement.querySelector('.chosen').style.display = 'none';
            pElement.style.display = 'flex'

        } else {
            targetElement.classList.add('wrong');
            answerContainer.children[rightanswer].classList.add('right')
            answerContainer.children[rightanswer].querySelector('p').style.display = 'flex'
            answerContainer.children[rightanswer].querySelector('p img').src = 'correct.png'
            answerContainer.children[rightanswer].querySelector('.chosen').style.display = 'none'
            answerContainer.style.pointerEvents = 'none'

            imgElement.style.display = 'block';
            pElement.style.display = 'flex';


        } answerContainer.style.pointerEvents = 'none';


        answers.forEach((item) => {
            item.style.pointerEvents = 'none';
        });
        checkDisable()

    }
});

reset.addEventListener('click', () => {
    clearInterval(intervalId); 
    mainContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    scoreCount = 1;
    correctAnswer = 0;
    currentQuestion = 0;
    timerCount = 30;
    localStorage.setItem('storedCount', scoreCount);
    localStorage.setItem('storedCorrect', correctAnswer);
    localStorage.setItem('storedQuestion', currentQuestion);
    localStorage.setItem('storedCorrectPercent', 0);
    localStorage.setItem('storedWrongPercent', 0);
    correctPercent.textContent = 0;
    wrongPercent.textContent = 0;
    success.style.width = '0%';
    fail.style.width = '0%';
    imageSetup();
    renderQuestions();
    startTimer();
    checkDisable();
    score.textContent = scoreCount;
})


document.getElementById('twitter-icon').addEventListener('click', function() {
    captureScreenshot();
});
document.getElementById('insta-icon').addEventListener('click', function() {
    captureScreenshot();
});
document.getElementById('linked-icon').addEventListener('click', function() {
    captureScreenshot();
});


function captureScreenshot() {
html2canvas(document.querySelector('.result-container')).then(canvas => {
    // Convert the canvas to an image
    const screenshot = canvas.toDataURL('image/png');

    // Create an anchor element to download the image
    const link = document.createElement('a');
    link.href = screenshot;
    link.download = 'quiz-screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
}