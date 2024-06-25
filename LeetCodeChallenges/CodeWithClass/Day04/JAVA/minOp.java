package Day04.JAVA;
import java.util.HashMap;
import java.util.Map;

public class minOp {
    public int minOperations(String[] logs) {
        Map<String, Integer> operations = new HashMap<>();
        operations.put("../", -1);
        operations.put("./", 0);

        int currentDepth = 0;
        for (String log : logs) {
            Integer move = operations.get(log);
            if (move != null) {
                if (move == -1 && currentDepth > 0) {
                    currentDepth--;
                }
            } else if (log == "./") {
                continue;
            } else {
                currentDepth++;
            }
        }

        return currentDepth;
    }

    public static void main(String[] args) {
        String[] logs = {"d1/", "d2/", "../", "d21/", "./"};
        minOp minOp = new minOp();
        System.out.println(minOp.minOperations(logs));
    }
}
