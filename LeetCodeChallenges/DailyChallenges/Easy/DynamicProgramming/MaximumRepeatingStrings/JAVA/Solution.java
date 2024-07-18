package DynamicProgramming.MaximumRepeatingStrings.JAVA;

public class Solution {
    public int maxRepeating(String sequence, String word) {
        int left = 0;
        int right = sequence.length() / word.length() + 1;

        while (left < right) {
            int mid = (left + right) / 2;
            if (sequence.contains(word.repeat(mid))) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left - 1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String sequence = "ababc";
        String word = "ab";
        System.out.println(solution.maxRepeating(sequence, word));
    }
}
