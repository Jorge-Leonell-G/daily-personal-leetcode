/**
 * Problem: 3418. Maximum Amount of Money Robot Can Earn
 * Difficulty: Medium
 * Category: Array, Dynamic Programming
 * Link: https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/description/?envType=problem-list-v2&envId=array
 * Time Complexity: O(m x n)
 * Space Complexity: O(m x n x 3)
 * Daily Challenge: Yes (01/04/2026)
 */

/**
 * @param {number[][]} coins
 * @return {number}
 */

var maximumAmount = function(coins) {
    const m = coins.length; // filas
    const n = coins[0].length; // columnas
    
    // se crea una matriz 3D: dp[i][j][k]
    // considerando el camino de costo máximo para llegar a la celda (i, j) mediante el uso de k neutralizaciones
    // se inicializa con -Infinity para indicar caminos no alcanzados
    const dp = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 
            new Array(3).fill(-Infinity)
        )
    );
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let val = coins[i][j]; // valor de la celda actual
            
            // caso base para la celda de inicio (0, 0)
            if (i === 0 && j === 0) {
                dp[0][0][0] = val; //asignacion del valor actual sin usar
                if (val < 0) { //encuentro con el ladrón
                    dp[0][0][1] = 0; // se procede a usar el powerup para neutralizar al ladron
                }
                continue;
            }
            
            // busqueda de mejores caminos previos
            let prev0 = -Infinity, prev1 = -Infinity, prev2 = -Infinity;
            
            if (i > 0) { // si i es mayor a 0, podemos venir desde arriba
                prev0 = Math.max(prev0, dp[i-1][j][0]);
                prev1 = Math.max(prev1, dp[i-1][j][1]);
                prev2 = Math.max(prev2, dp[i-1][j][2]);
            }
            if (j > 0) { // si j es mayor a 0, podemos venir desde la izquierda ya que solo se puede mover hacia abajo o hacia la derecha
                prev0 = Math.max(prev0, dp[i][j-1][0]);
                prev1 = Math.max(prev1, dp[i][j-1][1]);
                prev2 = Math.max(prev2, dp[i][j-1][2]);
            }
            
            // k = 0 (0 poderes usados)
            if (prev0 !== -Infinity) {
                dp[i][j][0] = prev0 + val;
            }
            
            // k = 1 (1 poder usado)
            if (prev1 !== -Infinity) {
                dp[i][j][1] = prev1 + val; // No se usa el powerup en esta celda
            }
            if (val < 0 && prev0 !== -Infinity) {
                // Se usa el 1er powerup en esta celda y se suma 0 en vez de val
                dp[i][j][1] = Math.max(dp[i][j][1], prev0); 
            }
            
            // k = 2 (2 poderes usados)
            if (prev2 !== -Infinity) {
                dp[i][j][2] = prev2 + val; // No se usa el powerup en esta celda
            }
            if (val < 0 && prev1 !== -Infinity) {
                // Se usa el 2do powerup en esta celda, se suma 0 en vez de val
                dp[i][j][2] = Math.max(dp[i][j][2], prev1);
            }
        }
    }
    
    // Una vez llegando a la esquina inferior derecha se retorna la mejor ganancia
    // Esto ya sea habiendo usado 0, 1 o 2 neutralizaciones.
    return Math.max(dp[m-1][n-1][0], dp[m-1][n-1][1], dp[m-1][n-1][2]);
};