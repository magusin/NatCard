document.addEventListener('DOMContentLoaded', async function () {
  // Création des joueurs
  const joueurs = [[], [], [], []]
  const joueursLabels = ['J1', 'J2', 'J3', 'J4'];

  const positions = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

  const couleurs = ['trèfle', 'pique', 'carreau', 'coeur']
  const valeurs = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Valet',
    'Reine',
    'Roi',
    'As'
  ]
  const jeuDeCartes = []
  let jeuxComplet = document.querySelector('#jeuxComplet')
  let suivis = document.querySelector('.suivis')

  for (let i = 0; i < couleurs.length; i++) {
    for (let j = 0; j < valeurs.length; j++) {
      const carte = {
        valeur: valeurs[j],
        couleur: couleurs[i]
      }
      jeuDeCartes.push(carte)
    }
  }
  // Afficher toutes les cartes en début de jeux
  function afficherTotalCarte() {
    return new Promise((resolve) => {
      for (let i = 0; i < jeuDeCartes.length; i++) {
        setTimeout(() => {
          const carte = `${jeuDeCartes[i].valeur}-de-${jeuDeCartes[i].couleur}`
          jeuxComplet.innerHTML += `<img src="../assets/${carte}.avif" title="${carte}" alt="${carte}">`
          if (i === jeuDeCartes.length - 1) {
            resolve()
          }
        }, 100 * (i + 1))
      }
    })
  }

  // fonction pour mélanger les cartes
  function melangerCartes(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  async function distribuerCartes() {
    // Appel de la fonction pour mélanger les cartes et stockage dans une constante
    const jeuMelange = melangerCartes(jeuDeCartes)

    // Distribution des cartes aux joueurs
    while (jeuMelange.length > 0) {
      for (let i = 0; i < joueurs.length; i++) {
        if (jeuMelange.length > 0) {
          const carte = jeuMelange.pop()
          joueurs[i].push(carte)
        }
      }
    }

    return joueurs
  }

async function cartejoueur(joueurs) {
// Affichage des tas de cartes des joueurs
for (let i = 0; i < joueurs.length; i++) {
    const joueurDiv = document.createElement('div');
    joueurDiv.classList.add('joueur');
    
    const joueurContent = document.createElement('div');
    joueurContent.classList.add('joueur-content');
    
    // const joueurHeading = document.createElement('p');
    // joueurHeading.textContent = `Joueur ${i + 1}`;
    // joueurContent.appendChild(joueurHeading);
    
    const joueurCardsDiv = document.createElement('div');
    joueurCardsDiv.classList.add('joueur-cards');
    joueurCardsDiv.textContent = `Joueur ${i + 1}`;
    for (let j = 0; j < joueurs[i].length; j++) {
      const carteImg = document.createElement('img');
      const cardAlt = `${joueurs[i][j].valeur}-de-${joueurs[i][j].couleur}`
      carteImg.src = `../assets/${joueurs[i][j].valeur}-de-${joueurs[i][j].couleur}.avif`;
      carteImg.alt = cardAlt;
      carteImg.title = cardAlt;
      joueurCardsDiv.appendChild(carteImg);
    }
    
    joueurContent.appendChild(joueurCardsDiv);
    joueurDiv.appendChild(joueurContent);
    
    document.body.appendChild(joueurDiv);
  }
}
// tirer une carte aléatoire du jeux du joueur, enlever l'image de carte de la div du joueur et enlever l'objet carte du tableau du joueur
async function tirerCarteAleatoire(joueurIndex) {
  const joueur = joueurs[joueurIndex];
  if (joueur.length === 0) {
    // console.log(`Le joueur ${joueurIndex + 1} n'a plus de cartes.`);

    return null;
  }

  const indexCarte = Math.floor(Math.random() * joueur.length);
  const carte = joueur.splice(indexCarte, 1)[0];

  const joueurDiv = document.querySelectorAll('.joueur')[joueurIndex];
  const joueurCardsDiv = joueurDiv.querySelector('.joueur-cards');

  const carteImg = joueurCardsDiv.querySelector(`img[title="${carte.valeur}-de-${carte.couleur}"]`);
  joueurCardsDiv.removeChild(carteImg);

  const joueurXDiv = document.querySelector(`.Joueur${joueurIndex + 1}`);
  const carteJoueurX = document.createElement('img');
  carteJoueurX.src = `../assets/${carte.valeur}-de-${carte.couleur}.avif`;
  carteJoueurX.alt = `${carte.valeur}-de-${carte.couleur}`;
  carteJoueurX.title = `${carte.valeur}-de-${carte.couleur}`;
  joueurXDiv.insertBefore(carteJoueurX, joueurXDiv.firstChild);
  return carte;
}

// fonction pour comparer deux cartes, si égalité nombre aléatoire pour déterminer le gagnant
async function comparerCartes(carte1, carte2) {
  if (carte1 === null) {
    return carte2;
  } else if (carte2 === null) {
    return carte1;
  }
  const valeur1 = valeurs.indexOf(carte1.valeur);
  const valeur2 = valeurs.indexOf(carte2.valeur);

  if (valeur1 > valeur2) {
    return carte1; // carte1 est supérieure à carte2
  } else if (valeur1 < valeur2) {
    return carte2; // carte1 est inférieure à carte2
  } else {
    // Égalité entre les deux cartes, tirer des nombres aléatoires jusqu'à la résolution
    while (true) {
      const random1 = Math.random();
      const random2 = Math.random();

      if (random1 > random2) {
        return carte1; // carte1 l'emporte
      } else if (random1 < random2) {
        return carte2; // carte2 l'emporte
      }
    }
  }
}

async function main() {
    await afficherTotalCarte()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await distribuerCartes()
    console.log(joueurs)
    await cartejoueur(joueurs)
    // Cacher la div "jeuxComplet"
    jeuxComplet.style.display = 'none'
    // Changer le contenu de l'élément avec la classe "suivis"
    suivis.innerHTML = 'Cartes des joueurs'

   // Ajout des labels des joueurs avec l'image de dos
  const joueurLabelsDiv = document.createElement('div');
  joueurLabelsDiv.classList.add('joueur-labels');

  for (let i = 0; i < joueursLabels.length; i++) {
    const labelDiv = document.createElement('div');
    labelDiv.classList.add(positions[i]);
    labelDiv.classList.add(`Joueur${i +1}`);

    
      const labelImg = document.createElement('img');
      labelImg.src = '../assets/back.avif';
      labelImg.alt = 'Back Image';
      labelImg.title = `${joueurs[i].length} ${joueurs[i].lenght === 1 ? 'Carte' : 'Cartes'}`;
      labelDiv.appendChild(labelImg);
  
      const labelText = document.createElement('span');
      labelText.textContent = joueursLabels[i];
      labelDiv.appendChild(labelText);
     

    joueurLabelsDiv.appendChild(labelDiv);
    document.body.appendChild(joueurLabelsDiv);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const carteJ1 = await tirerCarteAleatoire(0)
  const carteJ2 = await tirerCarteAleatoire(1)
  const carteJ3 = await tirerCarteAleatoire(2)
  const carteJ4 = await tirerCarteAleatoire(3)
  const gagnant1 = await comparerCartes(carteJ1, carteJ2)
  const gagnant2 = await comparerCartes(gagnant1, carteJ3)
  const gagantFinal = await comparerCartes(gagnant2, carteJ4)
  console.log(gagantFinal)

  }

  await main()
})

