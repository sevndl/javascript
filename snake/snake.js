document.getElementById("jouer").addEventListener("click", partie);

async function partie() {
  document.getElementById("resultat").innerHTML = "";
  const canvas = document.getElementById("snake");
  const context = canvas.getContext("2d");
  let vitesse = 500; // en milllisecondes
  let partieEnCours = true;
  const left = "LEFT";
  const right = "RIGHT";
  const up = "UP";
  const down = "DOWN";

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

  let snakeTeteX = snake[0].x;
  let snakeTeteY = snake[0].y;
  let nouvelleTete = {
    x: snakeTeteX,
    y: snakeTeteY
  };

  // direction du serpent
  let directionEnCours = right;
  let directionSouhaitee = null;
  function souhaitDirection(event) {
    let key = event.key;
    if (key == "ArrowLeft") {
      directionSouhaitee = left;
    } else if (key == "ArrowUp") {
      directionSouhaitee = up;
    } else if (key == "ArrowRight") {
      directionSouhaitee = right;
    } else if (key == "ArrowDown") {
      directionSouhaitee = down;
    }
  }

  // génération aléatoire de la nourriture sur le plateau
  let nourritureAleatoireX = unite + Math.floor(Math.random()*17) * unite;
  let nourritureAleatoireY = 2 * unite + Math.floor(Math.random()*15) * unite;
  for (let i = 0; i < snake.length; i++) {
    if (nourritureAleatoireX == snake[i].x && nourritureAleatoireY == snake[i].y) {
      nourritureAleatoireX = unite + Math.floor(Math.random()*17) * unite;
      nourritureAleatoireY = 2 * unite + Math.floor(Math.random()*15) * unite;
    }
  } 
  let food = {
    x: nourritureAleatoireX,
    y: nourritureAleatoireY
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

  // affichage du plateau
  function affichePlateau() {
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
  }

  // vérification de la direcion
  function verificationDirection() {
    if ((directionSouhaitee == left && directionEnCours != right) || (directionSouhaitee == up && directionEnCours != down) || (directionSouhaitee == right && directionEnCours != left) || (directionSouhaitee == down && directionEnCours != up)) {
      directionEnCours = directionSouhaitee;
      directionSouhaitee = null;
    }
  }

  // affichage du serpent
  function affichageSerpent() {
    for (let i = 0; i < snake.length; i++) {
      // remplissage du corps
      if (i == 0) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "white";
      }
      context.fillRect(snake[i].x + 10, snake[i].y + 10, 10, 10);
    }
  }

  // affichage de la nourriture pour le score
  function affichageImageScore() {
    context.drawImage(foodImage, 15, 15, unite, unite);
  }

  // affichage de la nourriture aléatoirement sur le plateau
  function affichageNourritureAleatoire() {
    context.drawImage(foodImage, food.x, food.y, unite, unite);
  }

  //affichage du score
  function affichageScore() {
    context.font = "24px serif";
    context.fillStyle = "white";
    context.clearRect(55, 20, 50, 30);
    context.fillText(score, 60, 40);
  }

  // déplacement à gauche
  function deplacementGauche() {
    snakeTeteX -= unite;
  }

  // déplacement à gauche
  function deplacementDroite() {
    snakeTeteX += unite;
  }

  // déplacement à gauche
  function deplacementHaut() {
    snakeTeteY -= unite;
  }

  // déplacement à gauche
  function deplacementBas() {
    snakeTeteY += unite;
  }

  // vérification fin de partie
  function verificationPartieTerminee() {
    if (nouvelleTete.x < 30 || nouvelleTete.x > 510 || nouvelleTete.y < 60 || nouvelleTete.y > 510 || seMangeLaQueue({x: snakeTeteX, y: snakeTeteY}, snake)) {
      partieEnCours = false;
      document.getElementById("resultat").innerHTML = "PARTIE TERMINEE, VOUS AVEZ PERDU AVEC LE SCORE DE " + score;
      document.getElementById("jouer").disabled = false;
    }
  }

  // état du serpent --> grandit ou reste identique
  function etatSerpent() {
    if (snakeTeteX == food.x && snakeTeteY == food.y) {
      score += 1;
      food = {
        x: unite + Math.floor(Math.random()*17) * unite,
        y: 2 * unite + Math.floor(Math.random()*15) * unite
      };
      if (vitesse > 100) {
        vitesse -= 20;
      }
    } else {
      snake.pop();
    }
  }

  //////////////////////////////////////////////////////////////////////
  document.addEventListener("keydown", souhaitDirection, false);
  while (partieEnCours) {
    document.getElementById("jouer").disabled = true;
    await new Promise(intervalle => setTimeout(intervalle, vitesse));

    affichePlateau();
    affichageSerpent();
    affichageImageScore();
    affichageNourritureAleatoire();

    snakeTeteX = snake[0].x;
    snakeTeteY = snake[0].y;
    verificationDirection();

    if (directionEnCours == left) {
      deplacementGauche();
    } else if (directionEnCours == right) {
      deplacementDroite();
    } else if (directionEnCours == up) {
      deplacementHaut();
    } else if (directionEnCours == down) {
      deplacementBas();
    }

    etatSerpent();

    nouvelleTete = {
      x: snakeTeteX,
      y: snakeTeteY
    };

    verificationPartieTerminee();
    snake.unshift(nouvelleTete);
    affichageScore();
  }
}
