/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];

/*
 * create cards
 */
const deck= document.querySelector('.deck');

function createCards() {
    for (let i = 0; i<cards.length; i++) {
        const cardTemplate = `<li class="card">
                              <i class="fa ${cards[i]}"></i>
                              </li>`
        deck.innerHTML += cardTemplate; 
    }
}

/*
 * create stars
 */
const stars = document.querySelector ('.stars');

function createStars() {
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('li');
        star.innerHTML = `<i class="fa fa-star"></i>`;
        stars.appendChild(star);
    }
}

/*
 * initiate game
 */

function initGame() {
    shuffle(cards);
    createCards();
    createStars();
    moves = 0;
}

initGame();


// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * variables
 */

const allCards = document.getElementsByClassName('.card');
const movesCount = document.querySelector ('.moves-count');
const minutes = document.querySelector ('.minutes');
const seconds = document.querySelector ('.seconds');
const restart = document.querySelector ('.restart');
const modal = document.querySelector('.modal');
const replayBtn = document.querySelector('.replay-btn');
const container = document.querySelector('.container');

deck.addEventListener('click', openCard);
restart.addEventListener('click', restartGame);
replayBtn.addEventListener('click',restartGame);

flippedCards = [];
matchedCards =[];

/*
 * flip the card
 */
let click = 0;
function openCard(event) { 
    
    let clickedCard = event.target;
    
    //prevent more than 2 card to be flipped
    if (flippedCards.length < 2) { 

        //only allow user to click on unflipped cards
        if (clickedCard.classList.contains('card') &&
        !clickedCard.classList.contains('open','show','match')){  
            //check for first click
            
            click++;
            if (click == 1){
                startTimer = setInterval(timer,1000);
            }

            clickedCard.classList.add('open','show');         
            flippedCards.push(clickedCard);
            cardOne = flippedCards[0];
            cardTwo = flippedCards[1];
            if (flippedCards.length == 2) {
                compare(cardOne,cardTwo);   
            }
        }       
    } 
}

/*
 * compare cards
 */ 

function compare(cardOne, cardTwo) {

    //the cards matched
    if (cardOne.innerHTML === cardTwo.innerHTML) {

        cardOne.classList.add('match');
        cardTwo.classList.add('match');
        flippedCards = [];
        matchedCards.push(cardOne,cardTwo);
        checkWin();

    //the cards didn't match
    } else {

        setTimeout(function() {
            cardOne.classList.remove('open','show');
            cardTwo.classList.remove('open','show');
            flippedCards = [];
        }, 600);    
    }
    countMoves();
}

/* 
 * timer
 */

let min = 0;
let sec = 0;
function timer() {
    
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
            min = 0;
        }
    }
    if (sec < 10) {
        seconds.innerText=`0${sec}`;
    } else {
        seconds.innerText = sec;
    }

    if (min < 10) {
        minutes.innerText = `0${min}`
    } else {
        minutes.innerText = min;
    }
} 

//clear timer
function clearTimer() {
    clearInterval(startTimer);
    min = 0;
    sec = 0;
    seconds.innerText = `00`;
    minutes.innerText = `00`;
    click = 0;
}

/* 
 * restart game
 */
function restartGame() {

    //delete cards
    deck.innerHTML = '';
    stars.innerHTML = '';

    //init game
    initGame();

    //clear out all values
    clearTimer();
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    movesCount.innerText = `0 Move`;
    if (star[1,2].classList.contains('greyed')) {
        star.classList.remove('greyed');
    }

    //clear out modal
    clearModal();
    container.classList.remove('disabled');
}

//clear modal
function clearModal() {
    modal.classList.add('no-show');
}

/*
 * count moves
 */
function countMoves() {
    moves++;
    if (moves < 2) {
        movesCount.innerText = `${moves} Move`;
    } else {
        movesCount.innerText = `${moves} Moves`;
    }
    starRatings();
}

/*
 * star ratings
 */
let star = stars.children;
function starRatings() {
   
    //if moves > 14, 2 stars
    if (moves >= 14 && moves < 22) {
        star[2].firstElementChild.classList.add('greyed');

    //if moves >= 22, 1 star
    } else if (moves >= 22) {
        star[1].firstElementChild.classList.add('greyed');
    }
}

/*
 * check if game is won
 */
function checkWin() {

    setTimeout(function() {
        if (matchedCards.length === 16) {
            
            clearInterval(startTimer);
            modalShow();
            container.classList.add('disabled');
    
        }
    }, 1000);
}

/* 
 * display popup modal
 */

const finalMoves = document.querySelector('.final-moves');
const finalTime = document.querySelector('.final-time');
const finalStar = document.querySelector('.final-star');

function modalShow () {
    modal.classList.remove('no-show');
    finalMoves.innerText = `Moves: ${moves}`;
    finalTime.innerText = `Time spent: ${minutes.innerText}:${seconds.innerText}`;
    finalStar.insertAdjacentHTML('beforeend',stars.innerHTML);
}