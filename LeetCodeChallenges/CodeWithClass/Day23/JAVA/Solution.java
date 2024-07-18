package Day23.JAVA;

import java.util.HashMap;

public class Solution {
    public int duplicateNumbersXOR(int[] nums) {
        HashMap<Integer, Integer> counts = new HashMap<>();
        for (int num : nums) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }

        int xor_result = 0;
        for (HashMap.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 2) {
                xor_result ^= entry.getKey();
            }
        }

        return xor_result;
    }
}
