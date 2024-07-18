prices = [8, 4, 6, 2, 3]
new_prices = []
for i in range(len(prices)-1):
    for j in range(i+1, len(prices)):
        if prices[i] > prices[j]:
            discount = prices[i] - prices[j]
            new_prices.append(discount)
            break
    else:
        new_prices.append(prices[i])

new_prices.append(prices[-1])

print(f"new_prices: {new_prices}")
