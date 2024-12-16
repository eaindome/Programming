public class Solution {
        public int removeDuplicates(int[] nums) {
            int k = 1;

            for (int i = 1; i < nums.size(); i++) 
            {
                if (nums[i] != nums[i - 1])
                {
                    nums[k] = nums[i];
                    k++;
                }
            }
            return k;
        }

        public static void Main() {
            Solution solution= new Solution();
            int[] nums = { 0,0,1,1,1,2,2,3,3,4 }

            int k = solution.removeDuplicates(nums);
            Console.WriteLine($"k: {k}")
        }
}