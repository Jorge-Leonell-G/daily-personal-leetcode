/**
 * Problem: 1848. Minimum Distance to the Target Element
 * Difficulty: Easy
 * Category: Array
 * Daily: Yes
 * Date: 02/04/2026
 * Link: https://leetcode.com/problems/minimum-distance-to-the-target-element/description/
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function(nums, target, start) {
    let min = Infinity; // distancia minima encontrada
    for (let i = 0; i < nums.length; i++){
        if(nums[i] == target){
            let actual = Math.abs(i - start); // distancia actual entre el indice i y start
            min = Math.min(min, actual); // se actualiza la distancia minima en caso de que la actual sea menor
        } 
    }

    return min;
};