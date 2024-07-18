package Day12.JAVA;

public class oddNum {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            if ("13579".contains(String.valueOf(num.charAt(i)))) {
                return num.substring(0, i + 1);
            }
        }
        return "";
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String num = "52";
        System.out.println(solution.largestOddNumber(num));
    }
}
