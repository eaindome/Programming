prices = [7,6,4,3,1]
profit = 0

for i in prices:
    if min(prices) == i:
        for j in prices[i+1:]:
            print(f"prices: {prices[i:]}")
            print(f"i: {i}, j: {j}")
            break
            if j > i:
                profit = max(profit, j - i)
                # print(profit)

#print(f"Profit: {profit}")

    