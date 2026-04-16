/**
 * Problem: 2515. Shortest Distance to Target String in a Circular Array
 * Difficulty: Easy
 * Category: Array, String
 * Daily: Yes
 * Date: 15/04/2026
 * Link: https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/description/
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closestTarget = function(words, target, startIndex) {
    const n = words.length;
    
    /*
    * para tener control sobre la distancia minima encontrada, se inicializa 
    * con un valor infinito para que cualquier distancia minima encontrada sea menor al inicial
    */
    let minDistancia = Infinity;
    
    for (let i = 0; i < n; i++) {
        if (words[i] === target) {
            
            // la distancia directa es el valor absoluto de la diferencia entre los indices actual y de inicio
            let distanciaDirecta = Math.abs(i - startIndex);
            
            // la distancia circular corresponde a la longitud del array menos la distancia directa, teniendo así un camino opuesto al directo
            let distanciaCircular = n - distanciaDirecta;
            
            // el camino mas corto entre el directo y circular es el candidato para ser la distancia minima
            let caminoCorto = Math.min(distanciaDirecta, distanciaCircular);
            
            // finalmente se actualiza la distancia minima en caso de que el camino mas corto encontrado sea menor a la distancia minima actual
            minDistancia = Math.min(minDistancia, caminoCorto);
        }
    }
    // si no se halla un match con el target, la distancia minima sigue siendo infinito
    // con el operador ternario se retorna -1 si no se tiene match; de lo contrario se retorna la distancia minima hallada
    return minDistancia === Infinity ? -1 : minDistancia;
};