/**
 * Problem: 3761. Minimum Absolute Distance Between Mirror Pairs
 * Difficulty: Medium
 * Category: HashTable, Array
 * Daily: Yes
 * Date: 17/04/2026
 * Link: https://leetcode.com/problems/minimum-absolute-distance-between-mirror-pairs/description/
 * Time Complexity: O(n * m) donde n es el número de elementos en nums y m es el número de dígitos en el número más grande (debido a la inversión)
 * Space Complexity: O(n) en el peor caso, si todos los números tienen reversos únicos almacenados en el mapa
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minMirrorPairDistance = function(nums) {
    /* 
    Función auxiliar para invertir los dígitos de un número
    Convertimos a string, separamos en arreglo, invertimos, unimos y pasamos a entero.
    parseInt maneja automáticamente la omisión de los ceros a la izquierda.
    */
    const reverseNumber = (num) => {
        return parseInt(num.toString().split('').reverse().join(''));
    };

    const map = new Map();
    let minDistance = Infinity; // Truco estándar para buscar el mínimo

    // Se itera sobre el arreglo, en donde el número actual actuará como nums[j]
    //reverse(nums[i]) == nums[j]
    for (let j = 0; j < nums.length; j++) {
        let current = nums[j];
        
        // Se verifica si existe un nums[i] válido hacia atrás
        // Si el mapa tiene 'current', significa que un elemento anterior 
        // guardó su reverso y resulta ser idéntico a nuestro valor actual.
        if (map.has(current)) {
            let i = map.get(current); // Obtenemos el índice de ese elemento anterior
            minDistance = Math.min(minDistance, j - i);
        }
        
        // Se preapara el elemento actual para el futuro, invirtiendo el número 
        // actual para guardarlo en el mapa con su índice.
        // Si ya existía, Map.set lo sobrescribe, lo cual es perfecto porque 
        // un índice más grande (más reciente) nos dará una distancia más corta después.
        let reversedCurrent = reverseNumber(current);
        map.set(reversedCurrent, j);
    }

    // Si minDistance nunca cambió, no hubo pares espejo
    return minDistance === Infinity ? -1 : minDistance;
};