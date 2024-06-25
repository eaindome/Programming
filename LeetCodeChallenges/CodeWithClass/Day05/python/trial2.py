prices = [7,1,5,3,6,4]
max_profit = 0

for i in range(len(prices)):
    for j in range(i+1, len(prices)):
        current_profit = prices[j] - prices[i]
        max_profit = max(max_profit, current_profit)

print(f"Maximum Profit: {max_profit}")