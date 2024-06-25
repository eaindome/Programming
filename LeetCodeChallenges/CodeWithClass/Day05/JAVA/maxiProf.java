package Day05.JAVA;

public class maxiProf {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length == 0) {
            return 0;
        }

        int maxProfit = 0;
        int minPrice = prices[0];

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }

        return maxProfit;
    }

    public static void main(String[] args) {
        maxiProf maxiProf = new maxiProf();
        int[] prices = {7, 1, 5, 3, 6, 4};
        int maxProfit = maxiProf.maxProfit(prices);
        System.out.println("Max Profit: " + maxProfit);
    }
}
