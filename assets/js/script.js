var questions = [
    {
        question: "What is the capital of Ohio?",
        answers: [
            { text: "Cleveland", correct: false},
            { text: "Lorain", correct: false},
            { text: "Columbus", correct: true},
            { text: "Toledo", correct: false},
            
        ]
    },

    {
        question: "What is the capital of Michigan?",
        answers: [
            { text: "Detroit", correct: false},
            { text: "Lansing", correct: true},
            { text: "Grand Rapids", correct: false},
            { text: "Holland", correct: false},
        ]
    },

    {
        question: "What is the capital of Illinois?",
        answers: [
            { text: "Springfield", correct: true},
            { text: "Chicago", correct: false},
            { text: "New Lenox", correct: false},
            { text: "Naperville", correct: false},
        ]
    },
    
    {
        question: "What is the capital of California?",
        answers: [
            { text: "Los Angeles", correct: false},
            { text: "Oakland", correct: false},
            { text: "San Diego", correct: false},
            { text: "Sacramento", correct: true},
        ]
    }

];

var questionElement = document.getElementById("question");
var startButton = document.getElementById("start");
var answerOptions = document.getElementById("answer-options");
var nextButton = document.getElementById("next");
var startButton = document.getElementById("timer");


var currentQuestion = 0;
var score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("guess");
        answerOptions.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var answerCorrect = selectedButton.dataset.correct === "true";
    if (answerCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }
    else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerOptions.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You answered ${score} out of 4 questions correctly!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function clickNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        clickNextButton();
    }
    else{ startQuiz();

    }
})


startQuiz();

