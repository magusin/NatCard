document.addEventListener('DOMContentLoaded', function () {
  // Afficher les cartes
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

  for (let i = 0; i < couleurs.length; i++) {
    for (let j = 0; j < valeurs.length; j++) {
      const carte = {
        valeur: valeurs[j],
        couleur: couleurs[i]
      }
      jeuDeCartes.push(carte)
    }
  }

  function afficherCarte(index) {
    if (index < jeuDeCartes.length) {
      jeuxComplet.innerHTML += `<img src="../assets/${jeuDeCartes[index].valeur}-de-${jeuDeCartes[index].couleur}.avif">`;
      setTimeout(function() {
        afficherCarte(index + 1);
      }, 100); // Temps d'attente en millisecondes (ici 1 seconde)
    }
  }
  
  afficherCarte(0);

  //   for (let i = 0; i < jeuDeCartes.length; i++) {
  //     jeuxComplet.innerHTML += `<img src=../assets/${jeuDeCartes[i].valeur}-de-${jeuDeCartes[i].couleur}.avif>`;
  //   }

  console.log(jeuDeCartes)
})
