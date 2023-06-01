document.addEventListener('DOMContentLoaded', async function () {
  // Création des joueurs
  const joueurs = [[], [], [], []]

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
  // Ajout de la div avec les étiquettes J1, J2, J3, J4 et l'image
const joueurLabelsDiv = document.createElement('div');
joueurLabelsDiv.classList.add('joueur-labels');

const joueursLabels = ['J1', 'J2', 'J3', 'J4'];
for (let i = 0; i < joueursLabels.length; i++) {
  const labelDiv = document.createElement('div');
  const labelImg = document.createElement('img');
  
  labelImg.src = '../assets/back.avif';
  labelDiv.appendChild(labelImg);
  labelDiv.textContent = joueursLabels[i];
  
  joueurLabelsDiv.appendChild(labelDiv);
}

document.body.appendChild(joueurLabelsDiv);
  }

  await main()
})

