public class Solution {
    public int subtractProductAndSum(int n) {
        int sum = 0;
        int product = 1;

        while (n > 0) {
            int digit = n % 10;
            sum += digit;
            product *= digit;
            n /= 10;
        }
        return product - sum;
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.subtractProductAndSum(234));
    }
}
