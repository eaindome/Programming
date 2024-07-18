import java.util.Deque;
import java.util.LinkedList;

public class price {
    public int[] finalPrices(int[] prices) {
        Deque<Integer> stack = new LinkedList<>();
        for (int i = 0; i < prices.length; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] >= prices[i]) {
                prices[stack.pop()] -= prices[i];
            }
            stack.push(i);
        }
        return prices;
    }
}