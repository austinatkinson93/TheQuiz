var index = 0;
var questionBoxEl = document.querySelector("#questionBox");
var headerEl = document.querySelector("#header")
var timer = 75;
var highscores = []

var timerEl = document.createElement("span")
var titleEl = document.createElement("h1");
var userScore = document.createElement("h3");
var userName = document.createElement("input");
var submitBtn = document.createElement("button");
var startBtnEl = document.createElement("button");
var viewHighscoreEl = document.createElement("a");
var highscoresEl = document.createElement("ol");
var goBackEl = document.createElement("button");
var clearEl = document.createElement("button");

titleEl.setAttribute("class", "row card-body");
viewHighscoreEl.setAttribute("class", "nav-link");
submitBtn.setAttribute("class", "btn btn-success");
startBtnEl.setAttribute("class", "btn btn-primary");
goBackEl.setAttribute("class", "btn btn-primary");
clearEl.setAttribute("class", "btn btn-danger");
userName.setAttribute("class", "form-control col-3");
userName.setAttribute("style",  "margin-top: 5px; margin-bottom: 5px" );
userScore.setAttribute("class", "row card-body")



//define all of our click handlers globally
startBtnEl.addEventListener("click", function () {
    timerFtn();
    showQuestion();
});

viewHighscoreEl.addEventListener("click", viewHighscore);

submitBtn.addEventListener("click", function () {
    console.log("submit button")
    highscoreSave();
    viewHighscore();
});



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


    questionBoxEl.appendChild(titleEl);
    questionBoxEl.appendChild(startBtnEl);

    headerEl.appendChild(viewHighscoreEl);
    headerEl.appendChild(timerEl);

    if (localStorage.getItem("UserScores") != null) {
        console.log("got high scores")
        highscores = JSON.parse(localStorage.getItem("UserScores"))
    }


}


// function that loops through the questions.
function showQuestion() {
    questionBoxEl.innerHTML = "";

    titleEl.textContent = questions[index].title;
    questionBoxEl.appendChild(titleEl);

    var choicesArray = questions[index].choices;

    choicesArray.forEach(function (item) {
        var buttonEl = document.createElement("button");
        var breakEl = document.createElement("br");
        buttonEl.setAttribute("class", "row btn btn-primary");
        buttonEl.setAttribute("style", "margin-top:2px; margin-left: 10px ");
        buttonEl.textContent = item;
        buttonEl.addEventListener("click", checkAnswers);
        questionBoxEl.appendChild(buttonEl);
        questionBoxEl.appendChild(breakEl);

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
    headerEl.innerHTML
    questionBoxEl.innerHTML = "";


    userName.setAttribute("placeholder", "Please enter initials");

    titleEl.textContent = "Great Job!";
    userScore.textContent = "Your final score is " + timer;
    submitBtn.textContent = "Submit";

    questionBoxEl.appendChild(titleEl);
    questionBoxEl.appendChild(userScore);
    questionBoxEl.appendChild(userName);
    questionBoxEl.appendChild(submitBtn);

    timerEl.innerHTML = "";
}

// function that controls the timer
function timerFtn() {
    var timerInterval = setInterval(function () {
        timerEl.textContent = "Time Remaining: " + timer;

        if (timer === 0 || index >= questions.length) {
            clearInterval(timerInterval);
        } else {
            timer--;
        }

    }, 1000);
}

// function that displayes the highscores
function viewHighscore() {
    questionBoxEl.innerHTML = "";
    headerEl.innerHTML = "";


    renderHighscores();

    titleEl.textContent = "Highscores";
    goBackEl.textContent = "Go Back";
    clearEl.textContent = "Clear Highscores";

    goBackEl.addEventListener("click", startMenu);
    clearEl.addEventListener("click", clear);

    questionBoxEl.appendChild(titleEl);
    questionBoxEl.appendChild(highscoresEl);
    questionBoxEl.appendChild(goBackEl);
    questionBoxEl.appendChild(clearEl);


}

// function that clears the highscores.
function clear() {
    localStorage.setItem("UserScores", "");
    highscores = [];
    viewHighscore();
}

function highscoreSave() {
    var savedScores = {
        name: userName.value,
        score: timer,
    }

    
    highscores.push(savedScores);
    localStorage.setItem("UserScores", JSON.stringify(highscores));
}



function renderHighscores (){
    highscoresEl.innerHTML = "";
    console.log(highscores);
    for (var i = 0; i < highscores.length; i++) {
        
 
        var listItem = document.createElement("li")
        listItem.setAttribute("class", "list-group-item")
        listItem.textContent = highscores[i].name + "  score: " + highscores[i].score;
        
        highscoresEl.appendChild(listItem)
    }
    
}


startMenu();

