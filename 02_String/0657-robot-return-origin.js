/**
 * Problem: 0657. Robot Return to Origin
 * Difficulty: Easy
 * Category: String
 * Daily: Yes
 * Date: 05/04/2026
 * Link: https://leetcode.com/problems/robot-return-to-origin/description/
 * Time Complexity: O(n) donde n es la longitud de la cadena de movimientos
 * Space Complexity: O(1) ya que solo se utilizan variables para contar las posiciones independientemente del tamaño de la entrada
 */

/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
    // representamos la posicion origen con variables para cada eje en el plano 2D
    let x = 0;
    let y = 0;
    
    //recorremos la cadena directamente ya que el string es iterable
    for(let i = 0; i < moves.length; i++){
        let pos = moves[i]; //se extrae la posicion actual de la cadena de movimientos
        if(pos === 'R'){
            x++; //incremento hacia la derecha del eje x
        } else if (pos === 'L'){
            x--; //decremento hacia la izquierda del eje x
        } else if (pos === 'U'){
            y++; //incremento hacia arriba del eje y
        } else if (pos === 'D'){
            y--; //decremento hacia abajo del eje y
        } else {
            return -1; //caracter no valido
        }
    }

    //evaluacion final para determinar si se regresó al origen
    if(x === 0 && y === 0){
        return true
    } else {
        return false;
    } 
};