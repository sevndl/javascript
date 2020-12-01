const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

// unité de mesure du plateau
const unite = 30;

// chargement des images
const foodImage = new Image();
const caseVertClair = new Image();
const caseVertFonce = new Image();
foodImage.src = "images/food.jpg";
caseVertClair.src = "images/case_vert_clair.png";
caseVertFonce.src = "images/case_vert_fonce.png";

// création du snake
let snake = [];
snake[0] = {
  x: 9 * unite,
  y: 10 * unite
};


// génération aléatoire de la nourriture sur le plateau 
let food = {
  x: unite + Math.floor(Math.random()*17 * unite),
  y: 2 * unite + Math.floor(Math.random()*15 * unite)
};

// création du score
let score = 0;

// affichage sur le canvas
function affichage() {
  // affichage du fond
  let alternance = true;
  for (let i = 30; i <= 510; i += unite) {
    alternance = !alternance;
    for (let j = 60; j <= 510; j += unite) {
      if (alternance) {
        context.drawImage(caseVertFonce, i, j, unite, unite);
        alternance = !alternance;
      } else {
        context.drawImage(caseVertClair, i, j, unite, unite);
        alternance = !alternance;
      }
    }
  }

  // affichage de la nourriture
  context.drawImage(foodImage, 15, 15, unite, unite);
  
  // affichage de la nourriture aléatoirement sur le plateau
  context.drawImage(foodImage, food.x, food.y, unite, unite);

  // affichage du serpent
  for (let i = 0; i < snake.length; i++) {
    // remplissage du corps
    if (i == 0) {
      context.fillStyle = "green";
    } else {
      context.fillStyle = "white";
    }
    context.fillRect(snake[i].x, snake[i].y, unite, unite);

    // bordure du serpent
    context.strokeStyle = "black";
    context.strokeRect(snake[i].x, snake[i].y, unite, unite);
  }
}

// rappeler la fonction tous les 100ms pour mettre à jour l'affichage
let game = setInterval(affichage, 100);