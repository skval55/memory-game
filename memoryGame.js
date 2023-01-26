const gameContainer = document.getElementById("game");
const score = document.getElementById("tries");
const btn = document.querySelector("button");
const COLORS = [
  "red1",
  "blue1",
  "green1",
  "orange1",
  "purple1",
  "red2",
  "blue2",
  "green2",
  "orange2",
  "purple2",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target.classList.value);
//   }

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

// my work
function flipCard(event, card, cardColor) {
  event.target.style.backgroundColor = cardColor;
  cardsFlipped.push(card);
}

// event.target.style.backgroundColor= event.target.classList.value
let cardsFlipped = [];
let tries = 0;
let matches = [];
function handleCardClick(event) {
  let card = event.target.classList.value;
  let cardColor = card.slice(0, -1);
  // you can use event.target to see which element was clicked
  // added

  // clear flips after 2 cards are flipped
  if (cardsFlipped.length < 2) {
    if (!checkColor(card)) {
      if (cardsFlipped.length === 0) {
        flipCard(event, card, cardColor);
      }
      // if it matches
      else if (
        cardsFlipped[0] !== card &&
        cardsFlipped[0].slice(0, -1) === cardColor
      ) {
        flipCard(event, card, cardColor);
        tries++;
        let match = cardsFlipped;
        matches.push(match);
        cardsFlipped = [];
      }
      // if doesn't match
      else if (cardsFlipped[0] !== card) {
        flipCard(event, card, cardColor);
        tries++;
        setTimeout(function () {
          document.querySelector(`div .${cardsFlipped[0]}`).style = "none";
          document.querySelector(`div .${cardsFlipped[1]}`).style = "none";
          cardsFlipped = [];
        }, 1000);
      }
    }
    // make sure matches keep their color
    for (let match of matches) {
      for (let color of match) {
        document.querySelector(`div .${color}`).style.backgroundColor =
          color.slice(0, -1);
      }
    }
  }
  if (matches.length === 5) {
    setTimeout(function () {
      alert(`Congratulations you won! It took you ${tries} attempts!`);
    }, 50);
  }
  score.innerText = ` SCORE: ${tries} ATTEMPTS`;
}
//   } else if (!flip1[0] === flip1[1]){
//     findMatch(event)
//     }
// }
btn.addEventListener("click", function () {
  cardsFlipped = [];
  tries = 0;
  for (let color of COLORS) {
    document.querySelector(`div .${color}`).style = "none";
  }

  matches = [];
  score.innerText = ` SCORE: ${tries} ATEMPTS`;
});
// funtion to check for color is matched

function checkColor(card) {
  for (let match of matches) {
    if (match.indexOf(card) > -1) {
      return true;
    }
  }
}
