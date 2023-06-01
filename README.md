# NatCard

Langage utilisé : Javascript

Les cartes sont déclarées visuellement et au survole de l'image textuellement.

Ensuite elles sont distribuées entre 4 joueur d'après l'algorithme de mélange de Fisher-Yates (merci https://www.delftstack.com/fr/howto/javascript/shuffle-array-javascript/)

Une fonction permet à chaque joueur de tirer une carte aléatoire

Ensuite une fonction prend deux cartes et défini la gagnante, cette opération est répétée jusqu'a la dernière gagnante.

Génération de message du joueur gagnant et ajout des cartes à son pli.

Puis recommencer le processus en mettant à jour le title des plis jusqu'à ce qu'il ne reste qu'un joueur.


