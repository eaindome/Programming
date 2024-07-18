package Day17.JAVA;
import java.util.HashSet;
import java.util.Set;

public class matrix {
    public void setZeroes(int[][] matrix) {
        Set<Integer> zeroRows = new HashSet<>();
        Set<Integer> zeroCols = new HashSet<>();

        for (int i = 0; i < matrix.length; i++){
            for (int j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    zeroRows.add(i);
                    zeroCols.add(j);
                }
            }
        }

        for (int num: zeroRows) {
            for (int i = 0; i < matrix[num].length; i++) {
                matrix[num][i] = 0;
            }
        }

        for (int num: zeroCols) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[j][num] = 0;
            }
        }
    }
}
