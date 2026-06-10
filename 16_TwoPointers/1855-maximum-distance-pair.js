/**
 * Problem: 1855. Maximum Distance Between a Pair of Values
 * Difficulty: Medium
 * Category: Two Pointers
 * Daily: Yes
 * Date: 19/04/2026
 * Link: https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/description/
 * Time Complexity: O(n) donde n es el número de elementos en el arreglo (debido a la iteración con dos punteros)
 * Space Complexity: O(1) ya que solo se utilizan variables constantes para los punteros y la distancia máxima
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDistance = function(nums1, nums2) {
    // Inicializamos nuestros "dos punteros" en el índice 0
    let i = 0; 
    let j = 0;
    
    // Variable para guardar el récord de la distancia máxima
    let maxDist = 0;
    
    // El ciclo continúa mientras ninguno de los punteros se salga de su arreglo
    while (i < nums1.length && j < nums2.length) {
        
        // Evaluamos si el par actual es válido
        if (nums1[i] <= nums2[j]) {
            // Es válido. Calculamos la distancia j - i.
            // Si es mayor que nuestro récord actual (maxDist), la actualizamos.
            // Nota: Math.max automáticamente ignora distancias negativas si 'i' 
            // llegara a rebasar a 'j' temporalmente.
            maxDist = Math.max(maxDist, j - i);
            
            // Movemos 'j' a la derecha para intentar expandir la distancia
            j++;
        } else {
            // No es válido (nums1[i] es muy grande).
            // Movemos 'i' a la derecha para buscar un número menor en nums1.
            i++;
        }
    }
    
    // Retornamos el récord final
    return maxDist;
};