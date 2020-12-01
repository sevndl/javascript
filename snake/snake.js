document.getElementById("jouer").addEventListener("click", partie);

async function partie() {
  document.getElementById("resultat").innerHTML = "";
  const canvas = document.getElementById("snake");
  const context = canvas.getContext("2d");
  
  // unité de mesure du plateau
  const unite = 30;
  
  // chargement des images
  const foodImage = new Image();
  const caseVertClair = new Image();
  const caseVertFonce = new Image();
  foodImage.src = "images/food.png";
  caseVertClair.src = "images/case_vert_clair.png";
  caseVertFonce.src = "images/case_vert_fonce.png";
  
  // création du snake
  let snake = [];
  snake[0] = {
    x: 9 * unite,
    y: 10 * unite
  };
  
  // direction du serpent
  let d = "RIGHT";
  
  document.addEventListener("keydown", direction);
  function direction(event) {
    let key = event.key;
    if (key == "ArrowLeft"  && d != "RIGHT") {
      d = "LEFT";
    } else if (key == "ArrowUp" && d != "DOWN") {
      d = "UP";
    } else if (key == "ArrowRight" && d != "LEFT")  {
      d = "RIGHT";
    } else if (key == "ArrowDown" && d != "UP") {
      d = "DOWN";
    }
  } 
  
  // génération aléatoire de la nourriture sur le plateau 
  let food = {
    x: unite + Math.floor(Math.random()*17) * unite,
    y: 2 * unite + Math.floor(Math.random()*15) * unite
  };
  
  // création du score
  let score = 0;
  
  // vérifie si le serpent se mange la queue
  function seMangeLaQueue(tete, snake) {
    for (let i = 0; i < snake.length; i++) {
      if (tete.x == snake[i].x && tete.y == snake[i].y) {
        return true;
      }
    }
    return false;
  }
  
  //////////////////////////////////////////////////////////////////////

  let partieEnCours = true;
  while (partieEnCours) {
    // affichage sur le canvas
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
  
    // affichage de la nourriture pour le score
    context.drawImage(foodImage, 15, 15, unite, unite);
  
    // affichage de la nourriture aléatoirement sur le plateau
    context.drawImage(foodImage, food.x, food.y, unite, unite);
  
    // affichage du serpent
    for (let i = 0; i < snake.length; i++) {
      // remplissage du corps
      if (i == 0) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "white";
      }
      context.fillRect(snake[i].x + 10, snake[i].y + 10, 10, 10);
    }
  
    // taille du serpent augmente en fonction de la direction
    // s'il arrive sur la case avec la nourriture, on laisse l'ancienne tête, sinon on l'enlève
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;
  
    if (d == "LEFT") 
      snakeHeadX -= unite;
    if (d == "RIGHT") 
      snakeHeadX += unite;
    if (d == "UP")
      snakeHeadY -= unite;
    if (d == "DOWN")
      snakeHeadY += unite;
  
    // si le serpent mange, on laisse toutes les cellules du tableau
    // sinon on enlève la dernière pour qu'il garde sa taille actuelle au prochain tour de boucle
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
      score += 1;
      food = {
        x: unite + Math.floor(Math.random()*17) * unite,
        y: 2 * unite + Math.floor(Math.random()*15) * unite
      };
    } else {
      snake.pop();
    }

    let nouvelleTete = {
      x: snakeHeadX,
      y: snakeHeadY
    };
    
    if (nouvelleTete.x < 30 || nouvelleTete.x > 540 || nouvelleTete.y < 30 || nouvelleTete.y > 540 || seMangeLaQueue({x: snakeHeadX, y: snakeHeadY}, snake)) {
      partieEnCours = false;
      document.getElementById("resultat").innerHTML = "PARTIE TERMINEE, VOUS AVEZ PERDU";
    }

    snake.unshift(nouvelleTete);
    context.font = "24px serif";
    context.fillStyle = "white";
    context.clearRect(55, 20, 50, 30);
    context.fillText(score, 60, 40);

    await new Promise(r => setTimeout(r, 100));
  }
}
