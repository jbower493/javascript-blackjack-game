// dealing sequence: player fu, dealer fd, player fu, dealer fd. dealer turns first card face up
// treat ace as 11 for now, figure out ace 1 / 11 logic later
// lets get started...

        // declare all global variables

// variables for messages
const dealerMessage = document.getElementById('message1');
const gameMessage = document.getElementById('message2');
const playerMessage = document.getElementById('message3');

// variable for back of card image
const cardBack = 'url(card-back.jpg)';

// variables for each card space
const dealer1 = document.getElementById('dh1');
const dealer2 = document.getElementById('dh2');
const player1 = document.getElementById('ph1');
const player2 = document.getElementById('ph2');

// variables for each button
const newGame = document.getElementById('new-game');
const deal = document.getElementById('deal');
const hit = document.getElementById('hit');
const stand = document.getElementById('stand');

// array for deck of cards
const deck = ['A hea', '2 hea', '3 hea', '4 hea', '5 hea', '6 hea', '7 hea', '8 hea', '9 hea', '10 hea', 'J hea', 'Q hea', 'K hea',
 'A dia', '2 dia', '3 dia', '4 dia', '5 dia', '6 dia', '7 dia', '8 dia', '9 dia', '10 dia', 'J dia', 'Q dia', 'K dia',
 'A clu', '2 clu', '3 clu', '4 clu', '5 clu', '6 clu', '7 clu', '8 clu', '9 clu', '10 clu', 'J clu', 'Q clu', 'K clu',
 'A spa', '2 spa', '3 spa', '4 spa', '5 spa', '6 spa', '7 spa', '8 spa', '9 spa', '10 spa', 'J spa', 'Q spa', 'K spa'];

// new array of deck to be manipulated
let gameDeck = [];

// global variables for players and dealers cards and initialize to empty arrays
let playersCards = [];
let dealersCards = [];

// global variable for dealers hidden (2nd) card
let dealersSecondCard;

// global variables, initialized as empty arrays to store numbers of players and dealers cards
let playersNumbers = [];
let dealersNumbers = [];

// global variable for player and dealers total
let playerTotal = 0;
let dealerTotal = 0;

// bust status
let playerBust = false;
let dealerBust = false;



          // all event triggered functions


// function to make hit and stand clickable
const makeActionsClickable = () => {
  hit.addEventListener('click', hitMeBabyOneMoreTime);
  stand.addEventListener('click', enoughIsEnough);
};

// function to stop hit and stand being clickable
const makeActionsUnclickable = () => {
  hit.removeEventListener('click', hitMeBabyOneMoreTime);
  stand.removeEventListener('click', enoughIsEnough);
};

// end the game
const endGame = () => {
  deal.style.display = 'none';
  newGame.style.display = 'block';
  console.log(deck);
  console.log(gameDeck);
};

// start new game
const restartGame = () => {
  // reset all global variables to original values
  // buttons
  deal.style.display = 'block';
  newGame.style.display = 'none';
  // messages
  dealerMessage.innerHTML = '';
  gameMessage.innerHTML = 'Lets play!';
  playerMessage.innerHTML = '';
  // card html and background colors
  dealer1.innerHTML = 'Card 1';
  dealer2.innerHTML = 'Card 2';
  player1.innerHTML = 'Card 1';
  player2.innerHTML = 'Card 2';
  dealer1.style.backgroundColor = '';
  dealer2.style.backgroundColor = '';
  player1.style.backgroundColor = '';
  player2.style.backgroundColor = '';
  dealer2.style.backgroundImage = '';
  // remove created card elements
  const elements = document.getElementsByClassName('fake');
  while(elements.length > 0) {
    elements[0].remove();
  }
  // reset the deck
  gameDeck = [];
  console.log(deck);
  // player and dealer cards
  playersCards = [];
  dealersCards = [];
  // dealer 2nd card
  dealersSecondCard = undefined;
  // numbers
  playersNumbers = [];
  dealersNumbers = [];
  // totals
  playerTotal = 0;
  dealerTotal = 0;
  // bust status
  playerBust = false;
  dealerBust = false;
};

// deal
const dealCards = () => {
  // push deck cards to gameDeck
  for(let i = 0; i < deck.length; i++) {
    gameDeck.push(deck[i]);
  }
  console.log(gameDeck);
  // call function to make hit and stand clickable
  makeActionsClickable();
  // get random card, save it to variable, show it in players hand and remove it from gameDeck. Finally push first card to respective cards array
  const randomP = Math.floor(Math.random() * gameDeck.length);
  let playersFirstCard = gameDeck[randomP];
  player1.style.backgroundColor = 'white';
  player1.innerHTML = playersFirstCard;
  gameDeck.splice(randomP, 1);
  playersCards.push(playersFirstCard);

  // repeat this process for dealer except dont display card yet
  const randomD = Math.floor(Math.random() * gameDeck.length);
  let dealersFirstCard = gameDeck[randomD];
  dealer1.style.backgroundImage = cardBack;
  gameDeck.splice(randomD, 1);
  dealersCards.push(dealersFirstCard);

  // players 2nd card
  const randomP2 = Math.floor(Math.random() * gameDeck.length);
  let playersSecondCard = gameDeck[randomP2];
  player2.style.backgroundColor = 'white';
  player2.innerHTML = playersSecondCard;
  gameDeck.splice(randomP2, 1);
  playersCards.push(playersSecondCard);

  // dealers second card
  const randomD2 = Math.floor(Math.random() * gameDeck.length);
  dealersSecondCard = gameDeck[randomD2];
  dealer2.style.backgroundImage = cardBack;
  gameDeck.splice(randomD2, 1);
  dealersCards.push(dealersSecondCard);

  // reveal dealers first card
  dealer1.style.backgroundImage = '';
  dealer1.style.backgroundColor = 'white';
  dealer1.innerHTML = dealersFirstCard;

  
  // push players numbers to global array
  playersCards.forEach(card => {
    let firstDigit = card[0];
    let secondDigit = card[1];
    if(secondDigit === '0') {
      playersNumbers.push(10);
    }
    switch(firstDigit) {
      case 'A':
        playersNumbers.push(11);
        break;
      case '2':
        playersNumbers.push(2);
        break;
      case '3':
        playersNumbers.push(3);
        break;
      case '4':
        playersNumbers.push(4);
        break;
      case '5':
        playersNumbers.push(5);
        break;
      case '6':
        playersNumbers.push(6);
        break;
      case '7':
        playersNumbers.push(7);
        break;
      case '8':
        playersNumbers.push(8);
        break;
      case '9':
        playersNumbers.push(9);
        break;
      case 'J':
      case 'Q':
      case 'K':
        playersNumbers.push(10);
        break;
    }
  })
  // count players score
  for(let i = 0; i < playersNumbers.length; i++) {
    playerTotal += playersNumbers[i];
  }

  // display player score
  playerMessage.innerHTML = `Your score: ${playerTotal}`;


  console.log(`${gameDeck.length} cards left in deck`);
  console.log(`players cards are: ${playersCards}`);
  console.log(`dealers cards are: ${dealersCards}`);
  console.log(`players score is: ${playerTotal}`);
};

// hit
const hitMeBabyOneMoreTime = () => {
  // get random card, save it to variable, show it in players hand and remove it from gameDeck. Finally push next card to respective cards array
  const randomP3 = Math.floor(Math.random() * gameDeck.length);
  let playersNextCard = gameDeck[randomP3];
  // create new cardspace element, give it innerHTML of the new card, append it to players hand
  newCard = document.createElement('div');
  newCard.classList.add('card-space');
  newCard.classList.add('fake');
  newCard.innerHTML = playersNextCard;
  newCard.style.backgroundColor = 'white';
  document.getElementById('players-hand').appendChild(newCard);
  gameDeck.splice(randomP3, 1);
  playersCards.push(playersNextCard);

  // add new card number to players score
  let firstDigit = playersNextCard[0];
  let secondDigit = playersNextCard[1];
  if(secondDigit === '0') {
    playersNumbers.push(10);
  }
  switch(firstDigit) {
    case 'A':
      playersNumbers.push(11);
      break;
    case '2':
      playersNumbers.push(2);
      break;
    case '3':
      playersNumbers.push(3);
      break;
    case '4':
      playersNumbers.push(4);
      break;
    case '5':
      playersNumbers.push(5);
      break;
    case '6':
      playersNumbers.push(6);
      break;
    case '7':
      playersNumbers.push(7);
      break;
    case '8':
      playersNumbers.push(8);
      break;
    case '9':
      playersNumbers.push(9);
      break;
    case 'J':
    case 'Q':
    case 'K':
      playersNumbers.push(10);
      break;
  }

  playerTotal += playersNumbers[playersNumbers.length - 1];

  console.log(`${gameDeck.length} cards left in deck`);
  console.log(`players cards are: ${playersCards}`);
  console.log(`players score is: ${playerTotal}`);

  // make player bust if over 21
  if(playerTotal > 21) {
    playerBust = true;
  }
  console.log(`Is the player bust? ${playerBust}`);

  // if player is bust, start dealers turn
  if(playerBust === true) {
    //enoughIsEnough();
    playerMessage.innerHTML = `You bust!`;
    gameMessage.innerHTML = 'Dealer wins!';
    // GAME END for if player busts
    //end game
    endGame();
  } else {
    // display player score
    playerMessage.innerHTML = `Your score: ${playerTotal}`;
  }
};

// extra function, dealer hit, called within stand function
const dealerHit = () => {
  // get random card, save it to variable, show it in dealers hand and remove it from gameDeck. Finally push next card to respective cards array
  const randomD3 = Math.floor(Math.random() * gameDeck.length);
  let dealersNextCard = gameDeck[randomD3];
  // create new cardspace element, give it innerHTML of the new card, append it to dealers hand
  newCard = document.createElement('div');
  newCard.classList.add('card-space');
  newCard.classList.add('fake');
  newCard.innerHTML = dealersNextCard;
  newCard.style.backgroundColor = 'white';
  document.getElementById('dealers-hand').appendChild(newCard);
  gameDeck.splice(randomD3, 1);
  dealersCards.push(dealersNextCard);

  // add new card number to dealerTotal
  let firstDigit = dealersNextCard[0];
  let secondDigit = dealersNextCard[1];
  if(secondDigit === '0') {
    dealersNumbers.push(10);
  }
  switch(firstDigit) {
    case 'A':
      dealersNumbers.push(11);
      break;
    case '2':
      dealersNumbers.push(2);
      break;
    case '3':
      dealersNumbers.push(3);
      break;
    case '4':
      dealersNumbers.push(4);
      break;
    case '5':
      dealersNumbers.push(5);
      break;
    case '6':
      dealersNumbers.push(6);
      break;
    case '7':
      dealersNumbers.push(7);
      break;
    case '8':
      dealersNumbers.push(8);
      break;
    case '9':
      dealersNumbers.push(9);
      break;
    case 'J':
    case 'Q':
    case 'K':
      dealersNumbers.push(10);
      break;
  }

  dealerTotal += dealersNumbers[dealersNumbers.length - 1];

  // display dealer score after dealer hit
  dealerMessage.innerHTML = `Dealer score: ${dealerTotal}`;

  console.log(`${gameDeck.length} cards left in deck`);
  console.log(`dealers cards are: ${dealersCards}`);
  console.log(`dealers score is: ${dealerTotal}`);

  // make dealer re hit if total less than 16 still
  if(dealerTotal < 16) {
    dealerHit();
  } else if(dealerTotal > 21) {
    dealerBust = true;
  }
  // if dealer is bust, display bust as dealer message
  if(dealerBust === true) {
    dealerMessage.innerHTML = 'Dealer bust';
  } else {
    dealerMessage.innerHTML = `Dealer score: ${dealerTotal}`;
  }

  // GAME END if player doesn't bust, dealer could have a score or be bust*
/*
  if(playerTotal === dealerTotal) {
    gameMessage.innerHTML = 'Game is a tie!';
  } else if(playerTotal > dealerTotal) {
    gameMessage.innerHTML = 'Player wins!';
  } else if(playerTotal < dealerTotal && dealerBust === false) {
    gameMessage.innerHTML = 'Dealer wins!';
  }
  // end the game
  endGame();
*/
};

// extra function, dealer stand, called within stand function


// stand
const enoughIsEnough = () => {
  // stop hit and stand being clickable
  makeActionsUnclickable();
  // iterate over dealers cards, removing first digit and pushing it to dealersNumbers array. If its J, Q, K push 10. Ace push 11
  dealersCards.forEach(card => {
    let firstDigit = card[0];
    let secondDigit = card[1];
    if(secondDigit === '0') {
      dealersNumbers.push(10);
    }
    switch(firstDigit) {
      case 'A':
        dealersNumbers.push(11);
        break;
      case '2':
        dealersNumbers.push(2);
        break;
      case '3':
        dealersNumbers.push(3);
        break;
      case '4':
        dealersNumbers.push(4);
        break;
      case '5':
        dealersNumbers.push(5);
        break;
      case '6':
        dealersNumbers.push(6);
        break;
      case '7':
        dealersNumbers.push(7);
        break;
      case '8':
        dealersNumbers.push(8);
        break;
      case '9':
        dealersNumbers.push(9);
        break;
      case 'J':
      case 'Q':
      case 'K':
        dealersNumbers.push(10);
        break;
    }
  })
  console.log(`dealers numbers are: ${dealersNumbers}`);
  // reveal dealers second card
  dealer2.style.backgroundImage = '';
  dealer2.style.backgroundColor = 'white';
  dealer2.innerHTML = dealersSecondCard;
  // calculate dealer total
  for(let i = 0; i < dealersNumbers.length; i++) {
    dealerTotal += dealersNumbers[i];
  }
  // display dealer score after 2nd card is revealed
  dealerMessage.innerHTML = `Dealer score: ${dealerTotal}`;

  console.log(`dealers score is: ${dealerTotal}`);
  // check dealers total with if statement, apply relevant logic for each case
  if(dealerTotal < 16) {
    dealerHit();
  }
  
  // GAME END for if player doesn't bust and dealer doesnt bust*

  if(playerTotal === dealerTotal) {
    gameMessage.innerHTML = 'Game is a tie!';
  } else if(playerTotal > dealerTotal || dealerBust === true) {
    gameMessage.innerHTML = 'Player wins!';
  } else {
    gameMessage.innerHTML = 'Dealer wins!';
  }
  // end game
  endGame();

};



// add event handlers to new-game and deal buttons
newGame.addEventListener('click', restartGame);
deal.addEventListener('click', dealCards);



// tasks still to do

// add time daleys to stagger the dealers moves
// improve visuals ie card pictures
// do ace logic
// keep working on it and adding other features as i learn