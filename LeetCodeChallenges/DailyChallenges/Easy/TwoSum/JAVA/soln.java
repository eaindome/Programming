import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (numMap.containsKey(complement)) {
                return new int[] {numMap.get(complement), i};
            }
            numMap.put(nums[i], i);
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