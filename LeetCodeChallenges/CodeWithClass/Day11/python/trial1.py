from typing import List

class Solution:
    def finalPrices(self, prices: List[int]) -> List[int]:
        new_prices = []

        for i in range(len(prices)-1):
            for j in range(i+1, len(prices)):
                if prices[i] >= prices[j]:
                    discount = prices[i] - prices[j]
                    new_prices.append(discount)
                    break
            else:
                new_prices.append(prices[i])
        new_prices.append(prices[-1])

        return new_prices
    
# test cases
prices = [10,1,1,6]
sol = Solution()
print(f"Discount on price List {prices}: {sol.finalPrices(prices)}")
