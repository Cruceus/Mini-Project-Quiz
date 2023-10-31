const questions = [
    {
        question: "What Monument has the highest health of Blue Scientist",
        answers: [
            {text: "Launch Site", correct: false },
            {text: "Train Yard", correct: false },
            {text: "Dome", correct: false },
            {text: "Military Tunnels", correct: true },
        ]
    },
    {
        question: "What gun has a normal magazine size of 24",
        answers: [
            {text: "Thompson", correct: false },
            {text: "Semi-automatic rifle", correct: false },
            {text: "Custom smg", correct: true },
            {text: "P250", correct: false },
        ]
    },
    {
        question: "What sight gives a .5 zoom",
        answers: [
            {text: "halo sight", correct: true },
            {text: "16x scope", correct: false },
            {text: "simple sight", correct: false },
            {text: "8x scope", correct: false },
        ]
    },
    {
        question: "Out of these which does not have a green card room",
        answers: [
            {text: "Harbor", correct: false },
            {text: "Dome", correct: true },
            {text: "Large oil rig", correct: false },
            {text: "Small oil rig", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; 
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selctAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
        
}

function selctAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block" ;
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz(); 
 