console.log(questions);
var index = 0;
var questionBoxEl = document.querySelector("#questionBox");
var headerEl = document.querySelector("#header")
var timerEl = document.createElement("span")
var timer = 75;
var highscores = []

console.log(questions.length)

function startMenu() {
    index = 0;
    questionBoxEl.innerHTML = "";
    headerEl.innerHTML = "";
    timer = 75

    var titleEl = document.createElement("h1");
    var startBtnEl = document.createElement("button");
    var viewHighscoreEl = document.createElement("a");

    titleEl.textContent = "Coding Quiz";
    startBtnEl.textContent = "start Quiz";
    viewHighscoreEl.textContent = "View Highscores";
    timerEl.textContent = "Time Remaining: " + timer;

    startBtnEl.addEventListener("click", function () {
        timerFtn();
        showQuestion();
    });
    // startBtnEl.addEventListener("click", timer)
    viewHighscoreEl.addEventListener("click", viewHighscore);

    questionBoxEl.appendChild(titleEl);
    questionBoxEl.appendChild(startBtnEl);

    headerEl.appendChild(viewHighscoreEl);
    headerEl.appendChild(timerEl);


}



function showQuestion() {
    console.log(timer);

    var titleEl = document.createElement("h1");
    questionBoxEl.innerHTML = "";

    titleEl.textContent = questions[index].title;
    questionBoxEl.appendChild(titleEl);

    var choicesArray = questions[index].choices;

    choicesArray.forEach(function (item) {
        var buttonEl = document.createElement("button");
        //buttonEl.setAttribute("class", "btn red etc.");
        buttonEl.textContent = item;
        buttonEl.addEventListener("click", checkAnswers);
        questionBoxEl.appendChild(buttonEl);
    });

};


function checkAnswers(event) {
    console.log(event.target);

    if (index < questions.length) {

        if (questions[index].answer === event.target.textContent) {

        } else {

            timer -= 15;
        }

        showQuestion();
        index++
    } else {
        endMenu();
    };
    console.log(index)
};

function endMenu() {
    questionBoxEl.innerHTML = ""

    var titleEl = document.createElement("h1")
    var userScore = document.createElement("p")
    var userName = document.createElement("input")
    var submitBtn = document.createElement("button")

    userName.setAttribute("placeholder", "Please enter initials")

    titleEl.textContent = "Great Job!"
    userScore.textContent = "Your final score is " + timer
    submitBtn.textContent = "Submit"
    submitBtn.addEventListener("click", function
    
    viewHighscore)

    questionBoxEl.appendChild(titleEl)
    questionBoxEl.appendChild(userScore)
    questionBoxEl.appendChild(userName)
    questionBoxEl.appendChild(submitBtn)

    timerEl.innerHTML = ""
}

function timerFtn() {
    var timerInterval = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timer

        if (timer === 0 || index >= questions.length) {
            clearInterval(timerInterval);
        }

        timer--;
    }, 1000);
}


function viewHighscore() {
    questionBoxEl.innerHTML = ""
    headerEl.innerHTML = ""

    var titleEl = document.createElement("h1")
    var highscoresEl = document.createElement("ol")
    var goBackEl = document.createElement("button")
    var clearEl = document.createElement("button")

    titleEl.textContent = "Highscores"
    goBackEl.textContent = "Go Back"
    clearEl.textContent = "Clear Highscores"

    goBackEl.addEventListener("click", startMenu)
    clearEl.addEventListener("click", clear)

    questionBoxEl.appendChild(titleEl)
    questionBoxEl.appendChild(highscoresEl)
    questionBoxEl.appendChild(goBackEl)
    questionBoxEl.appendChild(clearEl)


}

function clear() {
    highscoresEl.innerHTML = ""
}

function highscoreSave() {
    var score = {
        name: userName;
        score: timer;
    }
}


startMenu();


// things to fix:
// - time penalities not adding correctly
// - function that is saving score to dom.
// - styling 
// - 