from typing import List

class Solution:
    def finalPrices(self, prices: List[int]) -> List[int]:
        stack = []
        for i in range(len(prices)):
            while stack and prices[stack[-1]] >= prices[i]:
                prices[stack.pop()] -= prices[i]
            stack.append(i)
        return prices
    
# test cases
prices = [10,1,1,6]
sol = Solution()
print(f"Discount on price List {prices}: {sol.finalPrices(prices)}")