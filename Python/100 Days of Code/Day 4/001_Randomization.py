import random

random_integer = random.randint(1, 10)

print(random_integer)

#0.0000 - 0.9999
random_float = random.random()
print(random_float)

#0.0000 - 4.9999
random_float = random.random() * 5
print(random_float)

# from the love score calculator
love_score = random.randint(1, 100)
print(f"Your love score is {love_score}")