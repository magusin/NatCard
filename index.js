document.addEventListener('DOMContentLoaded', async function () {
  // Création des joueurs
  const players = [[], [], [], []]
  const playersLabels = ['J1', 'J2', 'J3', 'J4']
  let messages = [{ message: '' }]
  const positions = ['top-left', 'top-right', 'bottom-right', 'bottom-left']

  const colors = ['trèfle', 'pique', 'carreau', 'coeur']
  const values = [
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
  const cardGames = []
  let completeGame = document.querySelector('#jeuxComplet')
  let follow = document.querySelector('.suivis')

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < values.length; j++) {
      const card = {
        value: values[j],
        color: colors[i]
      }
      cardGames.push(card)
    }
  }
  // Afficher toutes les cartes en début de jeux
  function showAllCards() {
    return new Promise((resolve) => {
      for (let i = 0; i < cardGames.length; i++) {
        setTimeout(() => {
          const card = `${cardGames[i].value}-de-${cardGames[i].color}`
          completeGame.innerHTML += `<img src="../assets/${card}.avif" title="${card}" alt="${card}">`
          if (i === cardGames.length - 1) {
            resolve()
          }
        }, 100 * (i + 1))
      }
    })
  }

  // fonction pour mélanger les cartes
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  async function distributeCards() {
    // Appel de la fonction pour mélanger les cartes et stockage dans une constante
    const jeuMelange = shuffleCards(cardGames)

    // Distribution des cartes aux joueurs
    while (jeuMelange.length > 0) {
      for (let i = 0; i < players.length; i++) {
        if (jeuMelange.length > 0) {
          const card = jeuMelange.pop()
          players[i].push(card)
        }
      }
    }

    return players
  }

  async function playerCards(players) {
    // Affichage des tas de cartes des joueurs
    for (let i = 0; i < players.length; i++) {
      const playerDiv = document.createElement('div')
      playerDiv.classList.add('joueur')

      const joueurContent = document.createElement('div')
      joueurContent.classList.add('joueur-content')

      const joueurCardsDiv = document.createElement('div')
      joueurCardsDiv.classList.add('joueur-cards')
      joueurCardsDiv.textContent = `Joueur ${i + 1}`
      for (let j = 0; j < players[i].length; j++) {
        const cardImg = document.createElement('img')
        const cardDesc = `${players[i][j].value}-de-${players[i][j].color}`
        cardImg.src = `../assets/${cardDesc}.avif`
        cardImg.alt = cardDesc
        cardImg.title = cardDesc
        joueurCardsDiv.appendChild(cardImg)
      }

      joueurContent.appendChild(joueurCardsDiv)
      playerDiv.appendChild(joueurContent)

      document.body.appendChild(playerDiv)
    }
  }
  // tirer une carte aléatoire du jeux du joueur, enlever l'image de carte de la div du joueur et enlever l'objet carte du tableau du joueur
  async function drawRandomCards(joueurIndex) {
    const player = players[joueurIndex]
    if (player.length === 0) {
      // console.log(`Le joueur ${joueurIndex + 1} n'a plus de cartes.`);

      return null
    }

    const indexCarte = Math.floor(Math.random() * player.length)
    const card = player.splice(indexCarte, 1)[0]

    const playerDiv = document.querySelectorAll('.joueur')[joueurIndex]
    const joueurCardsDiv = playerDiv.querySelector('.joueur-cards')

    const cardImg = joueurCardsDiv.querySelector(
      `img[title="${card.value}-de-${card.color}"]`
    )
    joueurCardsDiv.removeChild(cardImg)

    const joueurXDiv = document.querySelector(`.Joueur${joueurIndex + 1}`)
    const playerCardsX = document.createElement('img')
    playerCardsX.src = `../assets/${card.value}-de-${card.color}.avif`
    playerCardsX.alt = `${card.value}-de-${card.color}`
    playerCardsX.title = `${card.value}-de-${card.color}`
    joueurXDiv.insertBefore(playerCardsX, joueurXDiv.firstChild)
    return card
  }

  // fonction pour comparer deux cartes, si égalité nombre aléatoire pour déterminer le gagnant
  async function versiusCards(card1, card2) {
    if (card1 === null) {
      return card2
    } else if (card2 === null) {
      return card1
    }
    const valeur1 = values.indexOf(card1.value)
    const valeur2 = values.indexOf(card2.value)

    if (valeur1 > valeur2) {
      return card1 // carte1 est supérieure à carte2
    } else if (valeur1 < valeur2) {
      return card2 // carte1 est inférieure à carte2
    } else {
      // Égalité entre les deux cartes, tirer des nombres aléatoires jusqu'à la résolution
      while (true) {
        // On sait jamais si deux nombres aléatoires se retrouve égaux aussi :)
        const random1 = Math.random()
        const random2 = Math.random()

        if (random1 > random2) {
          return card1 // carte1 l'emporte
        } else if (random1 < random2) {
          return card2 // carte2 l'emporte
        }
      }
    }
  }
  // fonction qui prend en argument le joueur gagnant et les cartes de la manche, supprime les cartes des joueurs en jeux et les affiches dans la div du joueur gagnant
  async function resultWinner(playerWinner, cartesManche) {
    const playerWinnerDiv = document.querySelectorAll('.joueur')[playerWinner]
    const joueurCardsDiv = playerWinnerDiv.querySelector('.joueur-cards')

    for (let i = 0; i < cartesManche.length; i++) {
      console.log('carteManche', cartesManche.length)
      const card = cartesManche[i]
      if (card !== null) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const carteActuelleSelector = document.querySelector(`.Joueur${i + 1}`)
        carteActuelleSelector.removeChild(carteActuelleSelector.firstChild)
        await new Promise((resolve) => setTimeout(resolve, 500))
        const cardImg = document.createElement('img')
        const cardDescription = `${card.value}-de-${card.color}`
        cardImg.src = `../assets/${cardDescription}.avif`
        cardImg.alt = cardDescription
        cardImg.title = cardDescription
        joueurCardsDiv.appendChild(cardImg)

        // Ajouter les cartes gagnantes au tableau joueurs

        players[playerWinner] = players[playerWinner].concat(cartesManche[i])
        
       

        console.log('joueur :', players)
      }
    }
    // Mettre à jour les titres de toutes les images des joueurs avec le nombre de cartes respectif
    for (let i = 0; i < players.length; i++) {
      const joueurIndex = i + 1
      const joueurImageBack = document
        .querySelector(`.Joueur${joueurIndex}`)
        .querySelector('img')
      joueurImageBack.title = `${players[i].length} ${
        players[i].length === 1 ? 'Carte' : 'Cartes'
      }`
    }
  }

  async function main() {
    await showAllCards()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await distributeCards()

    await playerCards(players)
    // Cacher la div "completeGame"
    completeGame.style.display = 'none'
    // Changer le contenu de l'élément avec la classe "follow"
    follow.innerHTML = 'Cartes des joueurs'

    // Ajout des labels des joueurs avec l'image de dos
    const playerLabelsDiv = document.createElement('div')
    playerLabelsDiv.classList.add('joueur-labels')

    for (let i = 0; i < playersLabels.length; i++) {
      const labelDiv = document.createElement('div')
      labelDiv.classList.add(positions[i])
      labelDiv.classList.add(`Joueur${i + 1}`)

      const labelImg = document.createElement('img')
      labelImg.src = '../assets/back.avif'
      labelImg.alt = 'Back Image'
      labelImg.title = `${players[i].length} ${
        players[i].length === 1 ? 'Carte' : 'Cartes'
      }`
      labelDiv.appendChild(labelImg)

      const labelText = document.createElement('span')
      labelText.textContent = playersLabels[i]
      labelDiv.appendChild(labelText)

      playerLabelsDiv.appendChild(labelDiv)
      document.body.appendChild(playerLabelsDiv)
    }
    const messageDiv = document.createElement('div')
    document.body.appendChild(messageDiv)
    async function round() {
    // démarrer une manche
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // déifnir les cartes tirées aléatoirement pour chaque joueur
    const cardJ1 = await drawRandomCards(0)
    const cardJ2 = await drawRandomCards(1)
    const cardJ3 = await drawRandomCards(2)
    const cardJ4 = await drawRandomCards(3)
    // déifnir les gagnants de chaque manche
    const winner1 = await versiusCards(cardJ1, cardJ2)
    const winner2 = await versiusCards(winner1, cardJ3)
    const finalWinner = await versiusCards(winner2, cardJ4)
    const carteManche = [cardJ1, cardJ2, cardJ3, cardJ4]
    // joueur gagnant
    let playerWinner
    if (finalWinner === cardJ1) {
      playerWinner = 1
    } else if (finalWinner === cardJ2) {
      playerWinner = 2
    } else if (finalWinner === cardJ3) {
      playerWinner = 3
    } else if (finalWinner === cardJ4) {
      playerWinner = 4
    }
    // Messages de victoire
    const messageVictory = [
      'Bravo ! <b>Joueur X</b> a gagné cette manche !',
      'Félicitations à <b>Joueur X</b> pour sa victoire lors de cette manche !',
      'Le vainqueur de cette manche est <b>Joueur X</b> !',
      '<b>Joueur X</b> remporte la manche !',
      '<b>Joueur X</b> sort vainqueur de cette manche !'
    ]

    // Choix aléatoire d'un message
    const messageIndex = Math.floor(Math.random() * messageVictory.length)
    const playerWinMessage = messageVictory[messageIndex].replace(
      'X',
      `${playerWinner}`
    )
    messageDiv.innerHTML = playerWinMessage
    await resultWinner(playerWinner - 1, carteManche)

     // Vérifier si seulement un joueur a encore des cartes
     const lastPlayers = players.filter((player) => player.length > 0);

     if (lastPlayers.length === 1) {
       // Il ne reste qu'un joueur avec des cartes, fin du jeu
       const lastPlayer = lastPlayers[0];
       console.log(`Le joueur ${players.indexOf(lastPlayer) + 1} a gagné la partie !`);
       messageDiv.innerHTML = `Le joueur ${players.indexOf(lastPlayer) + 1} a gagné la partie !`;
       return;
     }
    round()
  }
  round()
}

  await main()
})
