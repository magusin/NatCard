document.addEventListener('DOMContentLoaded', async function() {
     // Création des joueurs
     const joueurs = [[], [], [], []];

    const couleurs = ['trèfle', 'pique', 'carreau', 'coeur'];
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
    ];
    const jeuDeCartes = [];
    let jeuxComplet = document.querySelector('#jeuxComplet');
  
    for (let i = 0; i < couleurs.length; i++) {
      for (let j = 0; j < valeurs.length; j++) {
        const carte = {
          valeur: valeurs[j],
          couleur: couleurs[i]
        };
        jeuDeCartes.push(carte);
      }
    }
  // Afficher les cartes
    function afficherCarte() {
      return new Promise(resolve => {
        for (let i = 0; i < jeuDeCartes.length; i++) {
          setTimeout(() => {
            const carte = `${jeuDeCartes[i].valeur}-de-${jeuDeCartes[i].couleur}`
            jeuxComplet.innerHTML += `<img src="../assets/${carte}.avif" title="${carte}" alt="${carte}">`;
            if (i === jeuDeCartes.length - 1) {
              resolve();
            }
          }, 100 * (i + 1));
        }
      });
    }
  
    // fonction pour mélanger les cartes
    function melangerCartes(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    async function distribuerCartes() {
     
  
      // Appel de la fonction pour mélanger les cartes et stockage dans une constante
      const jeuMelange = melangerCartes(jeuDeCartes);
  
      // Distribution des cartes aux joueurs
      while (jeuMelange.length > 0) {
        for (let i = 0; i < joueurs.length; i++) {
          if (jeuMelange.length > 0) {
            const carte = jeuMelange.pop();
            joueurs[i].push(carte);
          }
        }
      }
  
      return joueurs;
    }
  
    async function main() {
        await afficherCarte();
        await distribuerCartes();
        console.log(joueurs);
    
        // Affichage des tas de cartes des joueurs après distribution
        for (let i = 0; i < joueurs.length; i++) {
          const joueurDiv = document.createElement('div');
          joueurDiv.classList.add('joueur');
          joueurDiv.innerHTML = `Joueur ${i + 1}`;
          for (let j = 0; j < joueurs[i].length; j++) {
            const carteImg = document.createElement('img');
            carteImg.src = `../assets/${joueurs[i][j].valeur}-de-${joueurs[i][j].couleur}.avif`;
            joueurDiv.appendChild(carteImg);
          }
          document.body.appendChild(joueurDiv);
        }
      }
    
      await main();
    });