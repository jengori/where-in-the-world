// number of questions the player has to answer in the quiz - change this number to get a longer or shorter quiz!
const numQuestionsInQuiz = 10;

// time limit (in seconds) to answer each question in the quiz:
const timeLimitPerQuestion = 10;

// other variables
let currentQuestionNumber;
let score;
let pageContent;


// construct array of question objects

class Question {
    constructor(country, landmark, options, image, description) {
        this.country = country;
        this.landmark = landmark;
        this.options = options;
        this.image = image;
        this.description = description;
    }
}

    // the questions!

const questionsJson = `{"0": {"country": "Argentina", "landmark": "Iguazu Falls", "options":["Chile", "Ecuador", "Argentina", "USA"], "image": "iguazufalls.jpeg", "description": "Iguazu Falls are waterfalls of the Iguazu River on the border of Argentina and Brazil. They make up the largest waterfall system in the world."}, "1": {"country": "Australia", "landmark": "Uluru", "options": ["Fiji", "New Zealand", "Australia", "Indonesia"], "image": "uluru.jpeg", "description": "Uluru is a large sandstone formation in the Northern Territory of Australia. It is sacred to the Aboriginal people of the area, known as the Anangu."}, "2": {"country": "China", "landmark": "The Great Wall", "options": ["Mexico", "China", "United Kingdom", "Germany"], "image": "greatwall.jpeg", "description": "The Great Wall of China  was built over centuries by China’s emperors to protect their territory. It stretches for thousands of miles along China’s historic northern border."}, "3": {"country": "France", "landmark": "Mont-St-Michel", "options": ["Netherlands", "Sweden", "Belgium", "France"], "image": "montstmichel.jpeg", "description": "Mont-Saint-Michel is a small island commune located off the coast of Normandy. It is one of France’s most popular tourist destinations."},"4": {"country": "Germany", "landmark": "Heidelberg Castle", "options": ["Poland", "France", "Greece", "Germany"], "image": "heidelberg.jpeg", "description": "Heidelberg Castle is a ruin in the German town of Heidelberg. The castle ruins are among the most important Renaissance structures north of the Alps."}, "5": {"country": "Greece", "landmark": "Parthenon", "options": ["Italy", "Spain", "India", "Greece"], "image": "parthenon.jpeg", "description": "The Parthenon on the Acropolis of Athens was built between 447 and 438 BC as a temple dedicated to the goddess Athena."},"6": {"country": "Iceland", "landmark": "Hallgrímskirkja", "options": ["USA", "New Zealand", "South Africa", "Iceland"], "image": "hallgrimskirkje.jpeg", "description": "Hallgrímskirkja is a Lutheran Church located in the city of Reykjavík. The towering structure stands 74 meters tall, making it Iceland's tallest church, and the country's sixth-tallest building."},"7": {"country": "India", "landmark": "Meenakshi Amman Temple", "options": ["Morocco", "India", "Thailand", "Cuba"], "image": "meenakshi.jpeg", "description": "Meenakshi Amman Temple is one of the oldest and most important temples in India. Located in the city of Madurai, the temple has great mythological and historical significance."},"8": {"country": "Italy", "landmark": "Colosseum", "options": ["Italy", "Spain", "United Kingdom", "Greece"], "image": "colosseum.jpeg", "description": "The Colosseum is an amphitheatre in the centre of the city of Rome. It is the largest ancient amphitheatre ever built."},"9": {"country": "Japan", "landmark": "Mount Fuji", "options": ["Japan", "Nepal", "South Korea", "USA"], "image": "mountfuji.jpeg", "description": "Mount Fuji is the tallest peak in Japan, the result of volcanic activity that began approximately 100,000 years ago. Today, it is a popular recreational destination for hiking, camping and relaxation."},"10": {"country": "Morocco", "landmark": "Hassan II Mosque", "options": ["Algeria", "Indonesia", "Pakistan", "Morocco"], "image": "hassanii.jpeg", "description": "The Hassan II Mosque is a mosque in Casablanca, Morocco. It is the largest functioning mosque in Africa and the 7th largest in the world."},"11": {"country": "Peru", "landmark": "Nazca Lines", "options": ["United Kingdom", "Mexico", "Argentina", "Peru"], "image": "nazcalines.jpeg", "description": "The Nazca Lines are a collection of geoglyphs in the southern desert of Peru. There are about 300 figures including geometric shapes, animal like figures, humans and plants."},"12": {"country": "Romania", "landmark": "Merry Cemetery", "options": ["Romania", "Spain", "Slovakia", "Turkey"], "image": "merrycemetery.jpeg", "description": "The Merry Cemetery in Săpânța, Romania is famous for for its brightly coloured tombstones with whimsical epitaphs describing the people who are buried there and paintings depicting scenes from their lives."},"13": {"country": "Spain", "landmark": "Casa Battló", "options": ["Portugal", "France", "Spain", "Netherlands"], "image": "casabattlo.jpeg", "description": "Casa Batlló is a building in the centre of Barcelona. It was designed by Antoni Gaudí, and is considered to be one of his masterpieces."},"14": {"country": "Sri Lanka", "landmark": "Sigiriya", "options": ["Australia", "Sri Lanka", "South Africa", "New Zealand"], "image": "sigiriya.jpeg", "description": "Sigiriya is an ancient rock fortress located near the town of Dambulla, Sri Lanka. Locals refer to it as the eighth wonder of the world."},"15": {"country": "Thailand", "landmark": "Wat Rong Khun (The White Temple)", "options": ["Thailand", "India", "Nepal", "Sri Lanka"], "image": "watrongkhun.jpeg", "description": "Wat Rong Khun  is an art exhibit in the style of a Buddhist Temple in Chiang Rai Province, Thailand. It is owned by Chalermchai Kositpipat, who opened it to visitors in 1997."}, "16": {"country": "United Kingdom", "landmark": "The Glenfinnan Viaduct", "options": ["USA", "United Kingdom", "India", "Austria"], "image": "glenfinnan.jpeg", "description": "The Glenfinnan Viaduct is a railway viaduct on the West Highland Line in Glenfinnan, Scotland. It has been used as a location in four of the Harry Potter films."}, "17": {"country": "USA", "landmark": "Golden Gate Bridge", "options": ["Canada", "Australia", "USA", "United Kingdom"], "image": "goldengate.jpeg", "description": "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide (1.6 km) strait connecting San Francisco Bay and the Pacific Ocean."}, "18": {"country": "France", "landmark": "Eiffel Tower", "options": ["Luxembourg", "Belgium", "France", "Switzerland"], "image": "eiffeltower.jpeg", "description": "The Eiffel Tower is a wrought iron lattice tower in Paris, France. It is locally known as 'La dame de fer' (French for 'Iron Lady')."}, "19": {"country": "France", "landmark": "Le Palais Idéal (The 'Ideal Palace')", "options": ["France", "Spain", "Cambodia", "Romania"], "image": "palaisideal.jpeg", "description": "The Palais Idéal in Hauterives, France, was built by a postman named Ferdinand Cheval. Over the course of 33 years, Cheval picked up stones during his daily mail rounds and carried them home to build the palace."}, "20": {"country": "USA", "landmark": "Foamhenge", "options": ["United Kingdom", "USA", "Italy", "Greece"], "image": "foamhenge.jpeg", "description": "Foamhenge is a full-scale styrofoam replica of Stonehenge located in Centreville, Virginia. It was created in 2004 as an April Fool's Day stunt to generate tourism."} }`

const questionsObject = JSON.parse(questionsJson);
const sizeOfQuestionSet = Object.keys(questionsObject).length;

let questions = [];

for (let i=0; i<sizeOfQuestionSet; i++) {
    let question = new Question(questionsObject[String(i)]["country"], questionsObject[String(i)]["landmark"], questionsObject[String(i)]["options"], questionsObject[String(i)]["image"], questionsObject[String(i)]["description"])
    questions.push(question);
}

// add event listener to "Start the quiz!" button

startButton = document.getElementById("start-button")
startButton.addEventListener("click", startQuiz)

// function startQuiz fades out the title page and displays the first question

function startQuiz() {
    score = 0;
    shuffle(questions);
    currentQuestionNumber = 1;
    fadeOut(document.getElementById("title-container"), 1500);

    pageContent = '<div id="question-container"><div id="timer"><i class="fa-solid fa-clock"></i> ' + timeLimitPerQuestion + 's</div><h1>Question ' + currentQuestionNumber + '</h1><h2>Where in the world is this?</h2><div id="photo-and-answers"><img class="question-photo" src="images/' + questions[currentQuestionNumber-1].image + '"><button class="answer-button">' + questions[currentQuestionNumber-1].options[0] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[1] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[2] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[3] + '</button></div></div>';

    setTimeout(showQuestion, 1500);
    setTimeout(startTimer, 1500);
}

//  function to shuffle an array

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// function fadeOut fades out an element at specified speed in ms.

function fadeOut(element, speed) {
    const seconds = speed/1000;
    element.style.transition = "opacity "+seconds+"s ease";
    element.style.opacity = 0;
    
        setTimeout(function() {
            element.parentNode.removeChild(element);
        }, speed);
}

// function showQuestion displays the next question in the quiz

function showQuestion() {

    document.getElementById("main-container").innerHTML = pageContent;
    let answerButtons = document.getElementsByClassName("answer-button");


    for (let i=0; i<answerButtons.length; i++){
        answerButtons[i].addEventListener("click", showResult);
        }
    document.getElementById("play-again").addEventListener("click", startQuiz);

}

// function startTimer starts the timer which displays the time remaining to answer the question:

function startTimer() {
    timer = document.getElementById("timer");
    let secondsRemaining = timeLimitPerQuestion;

    secondsRemaining--

    setTimer = setInterval(function(){
        timer.innerHTML = `<i class="fa-solid fa-clock"></i> ` + String(secondsRemaining) +`s`;

        // if there are less than 5 seconds remaining, change the timer color to red:

        if (secondsRemaining <= 5){
            timer.style.color = "red";
        }

        // if there is still time remaining to answer the question:
        if (secondsRemaining > 0)
            secondsRemaining--;

        // if the time is up:
        else {
            showResult()
        }
    }, 1000)
}

function showResult() {

    fadeOut(document.getElementById("question-container"), 1000);
    clearInterval(setTimer);

    let rightOrWrong;
    // if the correct answer was chosen:
    if (this.innerHTML == questions[currentQuestionNumber-1].country){
        rightOrWrong = `You got it right! <i class="fa-solid fa-face-smile"></i>`;
        score++;
        }

     // if the wrong answer was chosen:
    else if (questions[currentQuestionNumber-1].options.includes(this.innerHTML)){
        rightOrWrong = `You got it wrong! <i class="fa-solid fa-face-frown"></i>`
    }

    // if the time ran out:
    else {
        rightOrWrong = `Time up! <i class="fa-solid fa-face-frown"></i>`
    }
    
    let nextQuestionButtonText;

    // if it's the final question
    if (currentQuestionNumber === numQuestionsInQuiz) {
        nextQuestionButtonText = "See my score!"
        }
    
    // if it's not the final question
    else {
        nextQuestionButtonText = "Next question"
        }

    setTimeout(function(){
        document.getElementById("main-container").innerHTML = '<div id="question-container"><h1>' + rightOrWrong + '</h1><div id="photo-and-answers"><h2>'+ questions[currentQuestionNumber-1].landmark + ', ' + questions[currentQuestionNumber-1].country + '</h2><img class="question-photo" src="images/' + questions[currentQuestionNumber-1].image + '"><p>' + questions[currentQuestionNumber-1].description + '</p><button id="next-question-button">' + nextQuestionButtonText + ' <i class="fa-solid fa-arrow-right"></i></button></div></div>';
        document.getElementById("next-question-button").addEventListener("click", nextQuestion);
        }, 500);
    }

// function nextQuestion adds 1 to current question number and displays next question

function nextQuestion() {
    currentQuestionNumber++;
    fadeOut(document.getElementById("question-container"), 500);

    if (currentQuestionNumber <= numQuestionsInQuiz){
        pageContent = '<div id="question-container"><div id="timer"><i class="fa-solid fa-clock"></i> 10s</div><h1>Question ' + currentQuestionNumber + '</h1><h2>Where in the world is this?</h2><div id="photo-and-answers"><img class="question-photo" src="images/' + questions[currentQuestionNumber-1].image + '"><button class="answer-button">' + questions[currentQuestionNumber-1].options[0] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[1] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[2] + '</button><button class="answer-button">' + questions[currentQuestionNumber-1].options[3] + '</button></div></div>';
        setTimeout(showQuestion, 500);
        setTimeout(startTimer, 500);
        }
    else {
        pageContent = '<div id="title-container"><h1 id="your-final-score">Your final score is ' + score + ' out of ' + numQuestionsInQuiz + '!</h1><h2>Thank you for playing<br><span id="final-page-title">Where in the World?</h2><button id="play-again">Play again!</button></div>';
        setTimeout(showQuestion, 500);   
    }
}