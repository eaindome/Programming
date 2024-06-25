from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        
        max_profit = 0
        min_price = prices[0]

        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)

        return max_profit
    
# Test
prices1 = [7,1,5,3,6,4]
prices2 = [7,6,4,3,1]
sol = Solution()
print(f"Maximum Profit for price 1: {sol.maxProfit(prices1)}")
print(f"Maximum Profit for price 2: {sol.maxProfit(prices2)}")