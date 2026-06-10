/**
 * Problem: 2078. Two Furthest Houses With Different Colors
 * Difficulty: Easy
 * Category: Array, Greedy
 * Daily: Yes
 * Date: 20/04/2026
 * Link: https://leetcode.com/problems/two-furthest-houses-with-different-colors/description/
 * Time Complexity: O(n) donde n es el número de elementos en el arreglo (debido a las iteraciones para encontrar los extremos diferentes)
 * Space Complexity: O(1) ya que solo se utilizan variables constantes para almacenar las distancias y los índices de los extremos diferentes
 */

/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function(colors) {
    let n = colors.length;
    
    // extremos diferentes (Mejor caso O(1))
    if (colors[0] !== colors[n - 1]) {
        return n - 1; 
    }
    
    // distancia máxima respecto al inicio (0)
    let distFromStart = 0;
    // Se empieza desde el final hacia atrás deteniendose al primer color distinto
    for (let j = n - 1; j >= 0; j--) {
        if (colors[j] !== colors[0]) {
            distFromStart = j;
            break; 
        }
    }
    
    // distancia máxima respecto al final (n - 1)
    let distFromEnd = 0;
    // Se empieza desde el inicio hacia adelante deteniendose al primer color distinto
    for (let i = 0; i < n; i++) {
        if (colors[i] !== colors[n - 1]) {
            distFromEnd = (n - 1) - i; // (n-1) es el índice del último elemento, y al restar 'i' obtenemos la distancia desde el final
            break;
        }
    }
    
    // se retorna la mejor de ambas opciones
    return Math.max(distFromStart, distFromEnd);
};