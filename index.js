document.addEventListener('DOMContentLoaded', async function () {
  // Création des joueurs
  const players = [[], [], [], []]
  const playersLabels = ['J1', 'J2', 'J3', 'J4']

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
  let jeuxComplet = document.querySelector('#jeuxComplet')
  let suivis = document.querySelector('.suivis')

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
          jeuxComplet.innerHTML += `<img src="../assets/${card}.avif" title="${card}" alt="${card}">`
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
  async function versiusCards(carte1, carte2) {
    if (carte1 === null) {
      return carte2
    } else if (carte2 === null) {
      return carte1
    }
    const valeur1 = values.indexOf(carte1.value)
    const valeur2 = values.indexOf(carte2.value)

    if (valeur1 > valeur2) {
      return carte1 // carte1 est supérieure à carte2
    } else if (valeur1 < valeur2) {
      return carte2 // carte1 est inférieure à carte2
    } else {
      // Égalité entre les deux cartes, tirer des nombres aléatoires jusqu'à la résolution
      while (true) {
        // On sait jamais si deux nombres aléatoires se retrouve égaux aussi :)
        const random1 = Math.random()
        const random2 = Math.random()

        if (random1 > random2) {
          return carte1 // carte1 l'emporte
        } else if (random1 < random2) {
          return carte2 // carte2 l'emporte
        }
      }
    }
  }
  // fonction qui prend en argument le joueur gagnant et les cartes de la manche, supprime les cartes des joueurs en jeux et les affiches dans la div du joueur gagnant
  async function resultWinner(joueurGagnant, cartesManche) {
    const joueurGagnantDiv = document.querySelectorAll('.joueur')[joueurGagnant]
    const joueurCardsDiv = joueurGagnantDiv.querySelector('.joueur-cards')

    for (let i = 0; i < cartesManche.length; i++) {
      console.log('carteManche',cartesManche.length)
      const card = cartesManche[i]
      if (card !== null) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const carteActuelleSelector = document.querySelector(`.Joueur${i + 1}`)
        carteActuelleSelector.removeChild(carteActuelleSelector.firstChild)
        const imageBack = carteActuelleSelector.querySelector('img')
        await new Promise((resolve) => setTimeout(resolve, 500))
        const cardImg = document.createElement('img')
        const cardDescription = `${card.value}-de-${card.color}`
        cardImg.src = `../assets/${cardDescription}.avif`
        cardImg.alt = cardDescription
        cardImg.title = cardDescription
        joueurCardsDiv.appendChild(cardImg)
        
        // Ajouter les cartes gagnantes au tableau joueurs
        
        players[joueurGagnant] =  players[joueurGagnant].concat(
          cartesManche[i]
        )
        
        imageBack.title = `${players[i].length} ${
          players[i].length === 1 ? 'Carte' : 'Cartes'
        }`
        console.log('joueur :', players)
      }
    }
  }

  async function main() {
    await showAllCards()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await distributeCards()
    
    await playerCards(players)
    // Cacher la div "jeuxComplet"
    jeuxComplet.style.display = 'none'
    // Changer le contenu de l'élément avec la classe "suivis"
    suivis.innerHTML = 'Cartes des joueurs'

    // Ajout des labels des joueurs avec l'image de dos
    const joueurLabelsDiv = document.createElement('div')
    joueurLabelsDiv.classList.add('joueur-labels')

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

      joueurLabelsDiv.appendChild(labelDiv)
      document.body.appendChild(joueurLabelsDiv)
      
    }
    const messageDiv = document.createElement('div')
    document.body.appendChild(messageDiv)
    // démarrer une manche
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const carteJ1 = await drawRandomCards(0)
    const carteJ2 = await drawRandomCards(1)
    const carteJ3 = await drawRandomCards(2)
    const carteJ4 = await drawRandomCards(3)
    const gagnant1 = await versiusCards(carteJ1, carteJ2)
    const gagnant2 = await versiusCards(gagnant1, carteJ3)
    const gagnantFinal = await versiusCards(gagnant2, carteJ4)
    console.log(gagnantFinal)
    const carteManche = [carteJ1, carteJ2, carteJ3, carteJ4]
    let joueurGagnant
    if (gagnantFinal === carteJ1) {
      joueurGagnant = 1
    } else if (gagnantFinal === carteJ2) {
      joueurGagnant = 2
    } else if (gagnantFinal === carteJ3) {
      joueurGagnant = 3
    } else if (gagnantFinal === carteJ4) {
      joueurGagnant = 4
    }
    messageDiv.textContent = `Joueur${joueurGagnant} a gagné !`
    await resultWinner(joueurGagnant - 1, carteManche)
  }

  await main()
})
