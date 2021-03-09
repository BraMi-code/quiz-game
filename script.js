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

var quizContainer = document.getElementById('quiz-container');

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
}

function showQuestions(quizQuestions, quiz) {
    console.log(quizQuestions);
    var output = [];
    var answers;

    for (var i=0; i<quizQuestions.length; i++) {
        console.log(quizQuestions[i].question);
        answers = [];
        for (letter in quizQuestions[i].answers) {
            console.log(letter);
            answers.push(
                '<button> ' + quizQuestions[i].answers[letter] + '</button>'
            );
        }
        output.push(
            '<h3 class="question">' + quizQuestions[i].question + '</h3>' +
            '<div class="answers">' + answers.join('') + '</div>'
        );
    }
    quizContainer.innerHTML = output.join('');
}

function playQuiz(quizQuestions) {
    
    console.log("play the quiz")
    showQuestions(quizQuestions);
    console.log(quizQuestions[0]);

}


playQuiz(quizQuestions);