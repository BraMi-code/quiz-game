var quizQuestions = [
    {
        question: "What is another word for lexicon?",
        answers: {
            a: 'notebook',
            b: 'dictionary',
            c: 'address book'
        },
        correctAns: 'b'
    },
    {
        question: "What is the seventh planet from the sun?",
        answers: {
            a: 'Mars',
            b: 'Jupiter',
            c: 'Uranus'
        },
        correctAns: 'c'
    },
    {
        question: "What is the capital city of Spain?",
        answers: {
            a: 'Barcelona',
            b: 'Lisbon',
            c: 'Madrid'
        },
        correctAns: 'c'
    },
    {
        question: "What is the smallest country in the world?",
        answers: {
            a: 'Vatican City',
            b: 'Santiago',
            c: 'Andora'
        },
        correctAns: 'a'
    }
];

let gameLevel = 1;
let width = 25;

function move() {
    gameLevel++;
    console.log("game level: " + gameLevel);
    let myBar = document.getElementById('myBar');
    width += 25;

    console.log(width);
    if (width > 100) {
        gameLevel = 0;
    } else {
        myBar.style.width = width + "%";
    }
}

const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton =  document.getElementById('submit');
submitButton.addEventListener('click', showResults);

const shareButton = document.querySelector(".shareBtn");
const toggleButton = document.querySelector(".toggleBtn");

shareButton.addEventListener("click", function(){
	toggleButton.classList.toggle("active");
});

/* SOUND */
const mySound = document.getElementById('correct-answer');
const correctAnswer = document.getElementById('correctAns');
const wrongAnswer = document.getElementById('wrong-answer');

function playQuiz(quizQuestions) {
    // variable to store HTML
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNum) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
               `<label class="answer"> 
               <input type="radio" name="question${questionNum}" value="${letter}"> ${ currentQuestion.answers[letter] } 
               </label>`
            );
        } 
        output.push(
            `<div class="question slide">
                <h3>${currentQuestion.question} </h3>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    });

    // combine output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

let points;

function showResults(points) {
    console.log('results');
    // gather answer containers from quiz
    const ansContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    quizQuestions.forEach((currentQuestion, questionNum) => {
        // find selected answer
        const answerContainer = ansContainers[questionNum];
        const selector = `input[name=question${questionNum}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAns) {
            numCorrect++;
            console.log("num correct: " + numCorrect);
           
       /* ansContainers[questionNum].style.color = "lightgreen";
        }
        else {
            ansContainers[questionNum].style.color = "red";
        */ } 
      
    });

    points = numCorrect * 20;
    console.log("points: " + points);

    let strPoints = JSON.stringify(points);
    localStorage.setItem('points', strPoints);
    showHighScore();

    resultsContainer.innerHTML = `<p class="results-info">${numCorrect} out of ${quizQuestions.length}<p>`;
    if (numCorrect === quizQuestions.length) {
        mySound.play();
        alert("Great, you did it! :)");
    } else if (numCorrect === 0) {
        wrongAnswer.play();
    }
    showShareBtn();
}

playQuiz(quizQuestions);

// Pagination
const previousQuestnBtn = document.getElementById('previousQuestion');
previousQuestion.addEventListener('click', showPrevSlide);
const nextQuestBtn = document.getElementById('nextQuestion');
nextQuestion.addEventListener('click', showNextSlide);

function showNextSlide() {
    console.log("next slide");
    showSlide(currentSlide + 1);
    move();
}

function showPrevSlide() {
    console.log("prev");
    showSlide(currentSlide - 1);
    wrapper.style.display = "none";
}

function showSlide(numSlide) {
    questSlides[currentSlide].classList.remove('active-slide');
    questSlides[numSlide].classList.add('active-slide');
    currentSlide = numSlide;
    console.log("this is a current slide: " + numSlide);

    if (currentSlide === 0) {
        previousQuestnBtn.style.display = 'none';
    }
    else {
        previousQuestnBtn.style.display = 'inline-block';
    }
    if (currentSlide === questSlides.length-1) {
        nextQuestBtn.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else {
        nextQuestBtn.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

console.log(localStorage);

const questSlides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

const wrapper = document.querySelector(".share-wrapper");

function showShareBtn() {
    wrapper.style.display = "block";
}

function showHighScore() {
    let strToObj = JSON.parse(localStorage.getItem("points"));
    alert('Your high score is: ' + strToObj);
}