/**
 * Problem: 0001. Two Sum
 * Difficulty: Easy
 * Category: Array, Hash Table
 * Daily: No
 * Date: 02/04/2026
 * Link: https://leetcode.com/problems/two-sum/description/
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    //se procede a resolver con busqueda binaria
    for (let i = 0; i < nums.length; i++){
        for (let j = i + 1; j < nums.length; j++){
            if (nums[i] + nums[j] === target){
                return [i, j];
            }

        }
    }
    return [];
};