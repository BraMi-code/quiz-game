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
    }
];

const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton =  document.getElementById('submit');
submitButton.addEventListener('click', showResults);

/* SOUND */
var mySound = document.getElementById('correct-answer');
var correctAnswer = document.getElementById('correctAns');
var wrongAnswer = document.getElementById('wrong-answer');

function playQuiz(quizQuestions) {
    console.log("Let's start!");
    // variable to store HTML
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNum) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
               `<label> 
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

function showResults() {
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
            console.log(numCorrect);
        ansContainers[questionNum].style.color = "lightgreen";
        }
        else {
            ansContainers[questionNum].style.color = "red";
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    if (numCorrect === quizQuestions.length) {
        mySound.play();
    } else if (numCorrect === 0) {
        wrongAnswer.play();
    }
}

playQuiz(quizQuestions);

// Pagination
const previousQuestnBtn = document.getElementById('previousQuestion');
previousQuestion.addEventListener('click', showPrevSlide);
const nextQuestBtn = document.getElementById('nextQuestion');
nextQuestion.addEventListener('click', showNextSlide);

const questSlides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(numSlide) {
    console.log(numSlide);
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

function showNextSlide() {
    console.log("next slide");
    showSlide(currentSlide + 1);
}

function showPrevSlide() {
    console.log("prev");
    showSlide(currentSlide - 1);
}

showSlide(currentSlide);
