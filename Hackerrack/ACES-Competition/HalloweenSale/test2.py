# Initialize the initial price of the game
p = 20

# Initialize the amount by which the price decreases each time
d = 3

# Initialize the minimum price of the game
m = 6

# Initialize the amount of money you have
s = 85

# Initialize a list to store the price of each game, starting with the initial price
price_list = [p]

# While you have enough money to afford the current price
while s >= p:
    # Subtract the current price from your money
    s -= p
    
    # Decrease the price by d, but not below m
    p = max(p - d, m)
    
    # Add the new price to the list
    price_list.append(p)

# If you don't have enough money to afford the last price in the list, remove it
if s < price_list[-1]:
    price_list.pop(-1)

# Print the remaining money, the current price, the list of prices, and the number of games bought
print(f"S: {s}\n"
      f"P: {p}\n"
      f"Price List: {price_list}\n"
      f"Length: {len(price_list)}\n")