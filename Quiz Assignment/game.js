let options = document.querySelector('.options');
let currQuestion = document.querySelector('.question');
let allOptions = document.querySelectorAll('.option p');
let progress = document.querySelector('.progress');
let currScore = document.querySelector('.score');
let finalScore = 0;
let questionNum = document.querySelector('.question-num');
let qNo = 0;
let questionIndex;
let questions = [   
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];
let totalQuestions = questions.length;

window.onload = () => {
    displayNextQuestion();
}

options.addEventListener("click", (e) => {
    if (e.target.closest('.option')) {
        let optionDiv = e.target.closest('.option');
        let option = optionDiv.querySelector('.option-num').innerText;
        let optionNum = option.charCodeAt(0) - 64;
        checkAnswer(optionNum, optionDiv);
    }
});

function displayNextQuestion() {
    if (questions.length == 0) {
        localStorage.setItem('score', finalScore);
        endGame();
        return;
    }
    qNo++;
    questionNum.innerText = qNo + '/' + totalQuestions;

    progress.style.width = ((qNo / totalQuestions) * 100) + "%";

    let index = Math.floor(Math.random() * questions.length);
    currQuestion.innerText = questions[index].question;

    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].innerText = questions[index]['choice' + (i + 1)];
    }
    questionIndex = index;
}

function checkAnswer(userResponse, optionDiv) {
    if (userResponse == questions[questionIndex].answer) {
        optionDiv.classList.add('correct');
        finalScore += 10;
        currScore.innerText = finalScore;
    } else {
        optionDiv.classList.add('incorrect');
    }

    // Disable further clicks
    document.querySelectorAll('.option').forEach(opt => opt.classList.add('disabled'));

    questions.splice(questionIndex, 1);

    setTimeout(() => {
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('correct', 'incorrect', 'disabled'));
        displayNextQuestion();
    }, 1000);
}

function endGame() {
    window.location = './end.html';
}
