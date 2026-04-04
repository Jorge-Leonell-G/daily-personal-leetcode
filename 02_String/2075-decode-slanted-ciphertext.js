/**
 * Problem: 2075. Decode the Slanted Ciphertext
 * Difficulty: Medium
 * Category: String
 * Daily: Yes
 * Date: 04/04/2026
 * Link: https://leetcode.com/problems/decode-the-slanted-ciphertext/description/
 * Time Complexity: O(m x n x 3) where m is the number of rows and n is the number of columns in the encoded text
 * Space Complexity: O(m x n) where m is the number of rows and n is the number of columns in the encoded text
 */

/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
var decodeCiphertext = function(encodedText, rows) {
    if(rows === 1){
        return encodedText;
    }

    /*
    Calculo de la constante para las columnas
    Graficamente, se puede ver que el numero de columnas corresponde a la division
    entre el total de caracteres de la cadena cifrada entre el numero de filas (rows)
    */
    const cols = Math.floor(encodedText.length / rows) //se redondea la division para asegurar un entero ante cualquier duda
    let originalText = []; //mayor rendimiento que una cadena vacia ''

    //inicio de iteracion sobre las columnas para el control del desplazamiento diagonal
    for (let initCol = 0; initCol < cols; initCol++){
        //dentro se tiene un nuevo for exclusivo para el control de las filas 
        //asi se realiza el descenso en diagonal como en la flecha del grid
        //mientras que se tiene un inicio "fijo" para la columna, lo que itera 
        //son las filas dentro de una misma columna, asi se define cada casilla
        for (let r = 0; r < rows; r++){
            //se declara una nueva variable que correspondera a la casilla adyacente al indice de cada caracter en el desplazamiento diagonal
            let cell = initCol + r;

            //en dado caso de que la casilla sea igual o mayor a las columnas, se rompe el ciclo
            //esto con el fin de terminar justo cuando la ultima casilla (bottom-right) se encuentre ocupada
            if(cell >= cols){
                break;
            }

            //se implementa el indice para el mapeo de las coordenadas 
            //bidimensionales de la matriz a una sola dimension
            let i = (r * cols) + cell;

            //con push hacemos un append hacia nuestro array
            originalText.push(encodedText[i]);
        }
    }

    //al final se hace la union del arreglo en una unica cadena con join()
    //para eliminar los espacios del final se usa trim()
    return originalText.join('').trimEnd();

};