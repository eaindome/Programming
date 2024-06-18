import java.util.*;

public class baseG {
    public static int calPoints(String[] ops)  {
        ArrayList<Integer> scoreList = new ArrayList<>();

        for (String op:ops) {
            if (op.equals("C")) {
                scoreList.remove(scoreList.size() - 1);
            } else if (op.equals("D")) {
                scoreList.add(scoreList.get(scoreList.size() - 1) * 2);
            } else if (op.equals("+")) {
                scoreList.add(scoreList.get(scoreList.size() - 1) + scoreList.get(scoreList.size() - 2));
            } else {
                scoreList.add(Integer.parseInt(op));
            }
        }

        int sum = 0;
        for (int score:scoreList) {
            sum += score;
        }

        return sum;
    }

    public static void main(String[] args) {
        String[] ops1 = {"5", "2", "C", "D", "+"};
        String[] ops2 = {"5", "-2", "4", "C", "D", "9", "+", "+"};
        String[] ops3 = {"1", "C"};

        System.out.println("BaseballGame(['5', '2', 'C', 'D', '+']) = " + calPoints(ops1));
        System.out.println("BaseballGame(['5', '-2', '4', 'C', 'D', '9', '+', '+']) = " + calPoints(ops2));
        System.out.println("BaseballGame(['1', 'C']) = " + calPoints(ops3));
    }
}
