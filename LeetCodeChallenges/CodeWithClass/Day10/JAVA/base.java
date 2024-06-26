public class base {
    public String convertToBase7(int num) {
        if (num == 0) {
            return "0";
        }
        StringBuilder strDigits = new StringBuilder();
        int numAbs = Math.abs(num);
        while (numAbs > 0) {
            strDigits.append(numAbs % 7);
            numAbs /= 7;
        }
        if (num < 0) {
            strDigits.insert(0, "-");
        }
        return strDigits.reverse().toString();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.convertToBase7(100));  // Output: "202"
        System.out.println(solution.convertToBase7(-7));  // Output: "-10"
    }
}
