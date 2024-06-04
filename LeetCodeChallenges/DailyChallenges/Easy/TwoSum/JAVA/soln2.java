import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();

        for (int num : nums) {
            int complement = target - num;
            if (numMap.containsKey(complement)) {
                return new int[] {numMap.get(complement), num};
            }
            numMap.put(num, num);
        }

        throw new IllegalArgumentException("No two sum solution found.");
    }

    public static void main(String[] args) {
        Solution soln = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = soln.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}