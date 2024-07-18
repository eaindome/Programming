package Day15.JAVA;

public class soln {
    public int findMaxConsecutiveOnes(int[] nums) {
        int max_num = 0;
        int current_num = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 1) {
                current_num++;
                if (current_num > max_num) {
                    max_num = current_num;
                }
            } else current_num = 0;
        }
        return max_num;
    }
}
