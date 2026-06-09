/**
 * Problem: 3783. Mirror Distance of an Integer
 * Difficulty: Easy
 * Category: Math
 * Daily: Yes
 * Date: 18/04/2026
 * Link: https://leetcode.com/problems/mirror-distance-of-an-integer/description/
 * Time Complexity: O(m) donde m es el número de dígitos en n (debido a la inversión)
 * Space Complexity: O(1) ya que solo se utilizan variables constantes para almacenar el reverso y la distancia
 */

/**
 * @param {number} n
 * @return {number}
 */
var mirrorDistance = function(n) {
    // primero se convierte el numero a cadena, se separa en un arreglo de caracteres,
    // se invierte el arreglo, se une de nuevo en una cadena y se convierte a entero.
    let r = parseInt(n.toString().split('').reverse().join(''));
    //al final se retorna la distancia absoluta entre el número original y su reverso
    return Math.abs(n - r);
};