# using the round function
print(int(8/3))         # converting to int
print(8//3)             # using the floor division
print(round(8/3))
print(round(8/3, 2))
print(round(2.666666666666, 2))

# using shorthand
score = 0

# user scores a point
score += 1

print(score)

# user loses a point
score -= 1

print(score) 


# using fstrings
score = 0
height = 1.8
isWinning = True

print(f"your score is {score}, your height is {height}, and you are winnig is {isWinning}")



