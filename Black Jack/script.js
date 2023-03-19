var dealerSum = 0; //tracks score for dealer

var playerSum = 0; // tracks score for player which is me


var dealerAceCount = 0; // to count the aces in the hand, because ace can be 1 or 10
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true; // allows me to draw while your sum <= 21
window.onload = function () { // this will call a function when load the page
    buildDeck();
    shuffleDeck();
    startGame();
}
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "H", "S", "D"];
    deck = [];

    for (let i = 0; i < types.length; i++) { // look throught all the types
        for (let j = 0; j < values.length; j++) { // look through all the value
            deck.push(values[j] + "-" + types[i]); // this will have all 52 cards
        }
    }
    // console.log(deck); // if you go console log this you can see all 52 cards on the page
}


function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) { // this will go through all 52 cards
        let j = Math.floor(Math.random() * deck.length); // math.random will give a number between 0-1 * 52 which will give us 0-51.99999, which is why I used math.floor to get rid off the decimals
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp; // all of this to swap position
    }
    // console.log(deck); // if you console log deck now all the cards in the deck will be shuffled to a random position, every time you refresh its random
}

function startGame() {
    hidden = deck.pop(); // set the hidden cards, pop will remove a card from the array 
    dealerSum += getValue(hidden);// create a new function called getValue
    dealerAceCount += checkAce(hidden);
    //     console.log(hidden);
    //     console.log(dealerSum);

    while (dealerSum < 17) { // if dealers hand has sum less than 17 , we will give them one more card
        let cardImg = document.createElement("img"); // creating a img tag
        let card = deck.pop(); //got a card form deck
        cardImg.src = "./img/" + card + ".png"; //set img to the tag
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-card").append(cardImg);// apened the img to the dealer-card div
    }

    for (let i = 0; i < 2; i++) { // I only gets 2 cards at the beginning of the game
        let cardImg = document.createElement("img"); // creating a img tag
        let card = deck.pop(); //got a card form deck
        cardImg.src = "./img/" + card + ".png"; //set img to the tag
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-card").append(cardImg);// apened the img to the dealer-card div (it looked the same cuz i just copy paste from above, cuz its the same thing)
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img"); // creating a img tag
    let card = deck.pop(); //got a card form deck
    cardImg.src = "./img/" + card + ".png"; //set img to the tag
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-card").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) { // check playersum and into consideration of aces, if the sum is greater than 21 you cannot hit 
        canHit = false;
    }

}
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./img/" + hidden + ".png"; // reveal the hidden card

    let message = "";// these will be a series of win or lose conditions
    if (playerSum > 21) {
        message = "You lose!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }
    else if (dealerSum > 21) {
        message = "You Win!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }
    else if (playerSum === dealerSum) {
        message = "tie";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }
    else if (dealerSum > playerSum) {
        message = "You lose!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("result").innerText = message;

}
function getValue(card) {
    let data = card.split("-"); //  if you remember, the card is 4-c , 5-d ..... this will split the two into ["4","C"], ["5", "D"]....... so on and so forth
    let value = data[0]; // all i need is the value

    if (isNaN(value)) { // this is to see if our value contains digits, if not a number it will return true cuz its not a number, also the card could be A,J,Q,K
        if (value == "A") {
            return 11; // this will do is if its A return 11, others like JQK is all 10
        }
        return 10;
    }

    return parseInt(value);// other wise this gonna return whatever the digit is
}


function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}



document.querySelector('#restart').addEventListener('click', function () {
    window.location.reload();
    return false;

});