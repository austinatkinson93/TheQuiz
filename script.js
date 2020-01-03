var index = 0;
var questionBoxEl = document.querySelector("#questionBox");
var headerEl = document.querySelector("#header")
var timerEl = document.createElement("span")
var timer = 75;
var highscores = []

var titleEl = document.createElement("h1");
var userScore = document.createElement("p")
var userName = document.createElement("input")
var submitBtn = document.createElement("button")
var startBtnEl = document.createElement("button");
var viewHighscoreEl = document.createElement("a");
var highscoresEl = document.createElement("ol")
var goBackEl = document.createElement("button")
var clearEl = document.createElement("button")



// function that is displayed when the page is loaded and is the start menu for the quiz
function startMenu() {
    index = 0;
    questionBoxEl.innerHTML = "";
    headerEl.innerHTML = "";
    timer = 75


    titleEl.textContent = "Coding Quiz";
    startBtnEl.textContent = "start Quiz";
    viewHighscoreEl.textContent = "View Highscores";
    timerEl.textContent = "Time Remaining: " + timer;

    startBtnEl.addEventListener("click", function () {
        timerFtn();
        showQuestion();
    });
    viewHighscoreEl.addEventListener("click", viewHighscore);

    questionBoxEl.appendChild(titleEl);
    questionBoxEl.appendChild(startBtnEl);

    headerEl.appendChild(viewHighscoreEl);
    headerEl.appendChild(timerEl);


}


// function that loops through the questions.
function showQuestion() {

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

// function that keeps the score of the quiz
function checkAnswers(event) {


    if (questions[index].answer === event.target.textContent) {

    } else {
        timer -= 15;
    }

    index++

    if (index < questions.length) {
        showQuestion();
    } else {
        endMenu();
    };
};

// function that takes you to the end menu allowing for submission of scores into the local
function endMenu() {
    questionBoxEl.innerHTML = ""


    userName.setAttribute("placeholder", "Please enter initials")

    titleEl.textContent = "Great Job!"
    userScore.textContent = "Your final score is " + timer
    submitBtn.textContent = "Submit"
    submitBtn.addEventListener("click", function () {
        console.log("submit button")
        viewHighscore();
        highscoreSave();
    }
    )

    questionBoxEl.appendChild(titleEl)
    questionBoxEl.appendChild(userScore)
    questionBoxEl.appendChild(userName)
    questionBoxEl.appendChild(submitBtn)

    timerEl.innerHTML = ""
}

// function that controls the timer
function timerFtn() {
    var timerInterval = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timer

        if (timer === 0 || index >= questions.length) {
            clearInterval(timerInterval);
        }

        timer--;
    }, 1000);
}

// function that displayes the highscores
function viewHighscore() {
    questionBoxEl.innerHTML = ""
    headerEl.innerHTML = ""

    renderHighscores()

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

// function that clears the highscores.
function clear() {
    localStorage.setItem("UserScores", "")    
}

function highscoreSave() {
    var savedScores = {
        name: userName.value,
        score: timer,
    }

    
    highscores.push(savedScores)
    localStorage.setItem("UserScores", JSON.stringify(highscores))
}


startMenu();

function renderHighscores (){
    highscoresEl.innerHTML = ""
    var savedScores = JSON.parse(localStorage.getItem("UserScores"))

    for (var i = 0; i < savedScores.length; i++) {
        

        var listItem = document.createElement("li")
        listItem.textContent = savedScores[i].name + "  score: " + savedScores[i].score

        highscoresEl.appendChild(listItem)
    }

}

// things to fix:
// - time penalities not adding correctly
// - function that is saving score to dom.
// - styling 
// - 