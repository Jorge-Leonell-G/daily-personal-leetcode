/**
 * Problem: 3488. Closest Equal Element Queries
 * Difficulty: Medium
 * Category: HashTable, Array
 * Daily: Yes
 * Date: 16/04/2026
 * Link: https://leetcode.com/problems/closest-equal-element-queries/description/
 * Time Complexity: O(n + m) where n es el tamaño de nums y m es el tamaño de queries
 * Space Complexity: O(n) para el mapa de índices y el arreglo precomputado
 */

/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var minimumDistances = function(nums, queries) {
    const n = nums.length; // Guardamos el tamaño total del arreglo original
    
    /*
    En lugar de buscar un número por todo el arreglo cada vez, 
    hacemos un directorio donde anotamos en que posiciones aparece cada numero.
    Ejemplo: Si nums = [10, 20, 10, 30, 10]
    El mapa indicara que el '10' está en las posiciones [0, 2, 4].
    */
    const indicesMap = new Map();
    
    for (let i = 0; i < n; i++) {
        let val = nums[i];
        
        // Si es la primera vez que vemos este número, le creamos una lista vacía
        if (!indicesMap.has(val)) {
            indicesMap.set(val, []);
        }
        // Anotamos la posición (índice 'i') en la lista de este número
        indicesMap.get(val).push(i);
    }
    
    // Peparacion de las respuestas para la precomputacion
    // Creamos un arreglo del mismo tamaño que 'nums' y lo llenamos de -1.
    // Si un número resulta no tener "clones" repetidos, se quedará con el -1 por defecto.
    const precomputed = new Array(n).fill(-1);
    
    // Calculo de distancias solo entre vecinos (clones) de cada número
    // Recorremos nuestro directorio para analizar los grupos uno por uno
    //val y arr son el número y la lista de posiciones donde aparece ese número
    for (const [val, arr] of indicesMap.entries()) {
        const k = arr.length; // ¿Cuántas veces se repite este número?
        
        // Si solo se repite 1 vez, es imposible encontrar otro igual. Pasamos al siguiente.
        if (k === 1) continue; 
        
        // Si aparece 2 o más veces, calculamos las distancias para cada una de sus posiciones.
        for (let j = 0; j < k; j++) {
            let curr = arr[j]; // Nuestra posición actual a evaluar
            
            // Solo revisamos el clon de atrás (prev) y el de adelante (next).
            /*
            Usamos módulo (%) para que si estamos en el primer elemento, 
            su "vecino de atrás" sea el último de la lista, simulando un círculo.

            La formula para prev se sustenta en que si j es 0, 
            entonces (j - 1 + k) % k = (0 - 1 + k) % k = (k - 1) % k = k - 1, 
            que es el último índice de la lista.

            La formula para next se sustenta en que si j es el último índice (k - 1),
            entonces (j + 1) % k = (k - 1 + 1) % k = k % k = 0, 
            que es el primer índice de la lista.
            */
            let prev = arr[(j - 1 + k) % k]; // Índice del clon anterior
            let next = arr[(j + 1) % k];     // Índice del clon siguiente
            
            // ruta hacia el clon anterior
            let distPrevDirect = Math.abs(curr - prev); // Distancia caminando normal por el arreglo
            let distPrevCirc = n - distPrevDirect;      // Distancia yendo en reversa (por "fuera" del círculo)
            let shortestPrev = Math.min(distPrevDirect, distPrevCirc); // Nos quedamos con el camino más corto
            
            // ruta hacia el siguiente clon
            let distNextDirect = Math.abs(curr - next); // Distancia caminando normal por el arreglo
            let distNextCirc = n - distNextDirect;      // Distancia yendo en reversa (por "fuera" del círculo)
            let shortestNext = Math.min(distNextDirect, distNextCirc); // Nos quedamos con el camino más corto
            
            // La respuesta final para nuestra posición actual (curr) es decidir:
            // ¿Es más corto ir hacia el clon de atrás o hacia el clon de adelante?
            precomputed[curr] = Math.min(shortestPrev, shortestNext);
        }
    }
    
    // Respuestas de las consultas al instante
    // Ahora solo buscamos la respuesta en nuestro arreglo 'precomputed' y 
    // la entregamos.
    const answer = [];
    for (let i = 0; i < queries.length; i++) {
        let queryIndex = queries[i]; // El índice por el que nos están preguntando
        answer.push(precomputed[queryIndex]); // Metemos la respuesta ya calculada
    }
    
    return answer;
};