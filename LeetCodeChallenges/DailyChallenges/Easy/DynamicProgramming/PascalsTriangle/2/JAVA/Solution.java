import java.util.*;

public class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();
        row.add(1);

        for (int i = 1; i <= rowIndex; i++) {
            row.add(0, 0);
            for (int j = 0; j < i; j++) {
                row.set(j, row.get(j) + row.get(j+1));
            }
        }
        return row;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        List<Integer> res = sol.getRow(3);
        for (int num : res) {
            System.out.print(num + " ");
        }
    }
    
}

