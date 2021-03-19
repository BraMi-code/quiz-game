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

const nextQuestion = document.getElementById('nextQuestion');
nextQuestion.addEventListener('click', showNextSlide);

const previousQuestion = document.getElementById('previousQuestion');
previousQuestion.addEventListener('click', showPrevSlide);


/* SOUND
var mySound = document.getElementById('correct-answer');
var correctAnswer = document.getElementById('correctAns');
var wrongAnswer = document.getElementById('wrong-answer');

var wrong1 = document.getElementById('wrong1');
var wrong2 = document.getElementById('wrong2');
var wrong3 = document.getElementById('wrong3');

function wrongAnswer(e) {
    alert("Incorrect!");
    wrongAnswer.play();
}  

if (correctAnswer === true) {
    console.log("Correct!");
} */

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
            `<h3> ${currentQuestion.question} </h3>
            <div class="answers"> ${answers.join('')} </div>`
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
}

function showNextSlide() {
    console.log("next slide");
    showSlide(currentSlide + 1);
}

function showPrevSlide() {
    console.log("prev");
    showSlide(currentSlide - 1);
}

function showSlide(number) {
    console.log(number);
}


playQuiz(quizQuestions);