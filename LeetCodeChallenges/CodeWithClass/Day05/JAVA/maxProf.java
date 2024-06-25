package Day05.JAVA;
import java.util.List;

public class maxProf {
    public int maxProfit(List<Integer> prices) {
        if (prices == null ||  prices.isEmpty()) {
            return 0;
        }

        int maxProfit = 0;
        int minPrice = prices.get(0);

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }

        return maxProfit;

    }

    public static void main(String[] args) {
        maxProf maxProf = new maxProf();
        List<Integer> prices = List.of(7, 1, 5, 3, 6, 4);
        int maxProfit = maxProf.maxProfit(prices);
        System.out.println("Max Profit: " + maxProfit);
    }
}
