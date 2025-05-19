/*
Créé une fonction getFibonacciSequence qui prend un nombre n en paramètre et retourne un tableau contenant les n premiers nombres de la suite de Fibonacci.

Détails

* La suite de Fibonacci commence par les nombres 0 et 1.
* Chaque nombre suivant est la somme des deux nombres précédents.
* Par exemple, pour n = 5, la fonction devrait retourner [0, 1, 1, 2, 3].

Si n est inférieur ou égal à 0, la fonction doit retourner un tableau vide []
*/

function getFibonacciSequence(size: number): number[] {
  const tab: number[] = [];

  if (size >= 1) {
    tab.push(0);
  }
  if (size >= 2) {
    tab.push(1);
  }

  for (let i = 1; i < size; i++) {
    tab.push(tab[tab.length - 1] + tab[tab.length - 2]);
  }

  return tab;
}

export default getFibonacciSequence;
