# The Secret Auction Program

import os
from logo import logo

print(logo)
print("Welcome to the secret auction program.")
auction = {}
again = True
while again:
    name = input("What is your name?: ")
    bid = float(input("What's your bid?: $"))
    auction[name] = bid

    again = input("Are ther any other bidders? Type 'yes' or 'no':\n")
    if again.lower() == 'no':
        again = False
    os.system("cls")
    print("\t\t******The Secret Auction******")
    print(logo)

#print(auction)

highest_bid = 0
for bidder in auction:
    if auction[bidder] > highest_bid:
        highest_bid = auction[bidder]
        print(f"The highest bidder for this auction is : {bidder}\n"
              f"With the highest bid being: ${highest_bid}")
        