const pacArray = [
  [
    "./images/PacMan1.png",
    "./images/PacMan1.png",
    "./images/PacMan2.png",
    "./images/PacMan2.png",
  ],
  [
    "./images/PacMan3.png",
    "./images/PacMan3.png",
    "./images/PacMan4.png",
    "./images/PacMan4.png",
  ],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(20); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";

  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;
  newimg.height = 100;
  newimg.direction = 0;
  newimg.imgState = 0;
  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DO

  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    console.log(pacArray[1][0]);
    if (item.newimg.imgState === 1) {
      item.newimg.imgState = 2;
    } else if (item.newimg.imgState === 2) {
      item.newimg.imgState = 3;
    } else if (item.newimg.imgState === 3) {
      item.newimg.imgState = 0;
    } else if (item.newimg.imgState === 0) {
      item.newimg.imgState = 1;
    }
    item.newimg.src = pacArray[item.newimg.direction][item.newimg.imgState];
  });
  setTimeout(update, 50);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce

  let gameWidth = document.getElementById("game").clientWidth;
  let gameHeight = document.getElementById("game").clientHeight;

  if (item.position.x >= gameWidth) {
    item.velocity.x = item.velocity.x * -1;
    item.newimg.direction = 1;
  } else if (item.position.x <= 0) {
    item.velocity.x = item.velocity.x * -1;
    item.newimg.direction = 0;
  }
  if (item.position.y >= gameHeight || item.position.y <= 0) {
    item.velocity.y = item.velocity.y * -1;
  }
}

function refresh() {
  location.reload();
}
function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
