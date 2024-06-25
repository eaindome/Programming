from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0

        for i in range(len(prices)):
            for j in range(i+1, len(prices)):
                current_profit = prices[j] - prices[i]
                max_profit = max(max_profit, current_profit)

        return max_profit
    
# Test
prices1 = [7,1,5,3,6,4]
prices2 = [7,6,4,3,1]
sol = Solution()
print(f"Maximum Profit for price 1: {sol.maxProfit(prices1)}")
print(f"Maximum Profit for price 2: {sol.maxProfit(prices2)}")