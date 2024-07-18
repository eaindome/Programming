package Day16.JAVA;

public class soln {
    public int findNumbers(int[] nums) {
        int even_count = 0;

        for (int num: nums) {
            int countNums = (int) (Math.log10(num) + 1);
            if (countNums % 2 == 0) {
                even_count++;
            }
        }
        return even_count;
    }
}
