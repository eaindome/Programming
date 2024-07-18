package Day22.JAVA;
import java.util.Arrays;

public class array {
    public static void main(String[] args) {
        int[] heights = {1, 2, 3, 4, 5};
        int[] sortedHeights = heights.clone();
        // System.out.println(Arrays.toString(sortedHeights));

        // sort the array
        Arrays.sort(sortedHeights);

        int count = 0;
        for (int i = 0; i < sortedHeights.length; i++) {
            if (sortedHeights[i] != heights[i]) {
                count++;
            }
        }

        System.out.println("Count: " + count);
    }
}
